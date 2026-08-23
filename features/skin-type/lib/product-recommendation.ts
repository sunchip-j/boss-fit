import rawProducts from "@/features/skin-type/data/skin-products.json";
import {
  PRODUCT_CATEGORIES,
  getSkinTypeInfo,
} from "@/features/skin-type/data/skin-type-info";
import type {
  ProductCategory,
  ProductRecommendation,
  ResolvedRecommendedProduct,
  SkinProduct,
  SkinTypeCode,
} from "@/features/skin-type/types";

const SUPPORTED_SKIN_TYPE_PATTERN = /^[DO][SR][PN][WT]$/;
const PRODUCT_CATEGORY_SET = new Set<string>(PRODUCT_CATEGORIES);

function warnInvalidProduct(message: string) {
  if (process.env.NODE_ENV !== "production") {
    console.warn(`[skin-products] ${message}`);
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isProductCategory(value: unknown): value is ProductCategory {
  return typeof value === "string" && PRODUCT_CATEGORY_SET.has(value);
}

function isSkinTypeCode(value: unknown): value is SkinTypeCode {
  return typeof value === "string" && SUPPORTED_SKIN_TYPE_PATTERN.test(value);
}

function toStringArray(value: unknown): string[] | null {
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    return null;
  }

  return value;
}

function validateRecommendation(
  value: unknown,
  productId: string
): ProductRecommendation | null {
  if (!isRecord(value)) {
    warnInvalidProduct(`${productId}: recommendation must be an object.`);
    return null;
  }

  const skinType = value.skinType;
  const reason = value.reason;
  const order = value.order;

  if (!isSkinTypeCode(skinType)) {
    warnInvalidProduct(`${productId}: unsupported skinType.`);
    return null;
  }

  if (typeof reason !== "string" || reason.trim() === "") {
    warnInvalidProduct(`${productId}: recommendation reason is required.`);
    return null;
  }

  if (
    typeof order !== "number" ||
    !Number.isFinite(order) ||
    order < 0
  ) {
    warnInvalidProduct(`${productId}: recommendation order must be a number.`);
    return null;
  }

  return {
    skinType,
    reason,
    order,
  };
}

function validateProduct(value: unknown, seenIds: Set<string>): SkinProduct | null {
  if (!isRecord(value)) {
    warnInvalidProduct("product must be an object.");
    return null;
  }

  const id = value.id;
  const brand = value.brand;
  const name = value.name;
  const category = value.category;
  const tags = toStringArray(value.tags);
  const summary = value.summary;
  const recommendationsValue = value.recommendations;
  const active = value.active;

  if (typeof id !== "string" || id.trim() === "") {
    warnInvalidProduct("product id is required.");
    return null;
  }

  if (seenIds.has(id)) {
    warnInvalidProduct(`${id}: duplicated product id.`);
    return null;
  }

  if (typeof brand !== "string" || brand.trim() === "") {
    warnInvalidProduct(`${id}: brand is required.`);
    return null;
  }

  if (typeof name !== "string" || name.trim() === "") {
    warnInvalidProduct(`${id}: name is required.`);
    return null;
  }

  if (!isProductCategory(category)) {
    warnInvalidProduct(`${id}: unsupported category.`);
    return null;
  }

  if (!tags) {
    warnInvalidProduct(`${id}: tags must be a string array.`);
    return null;
  }

  if (typeof summary !== "string" || summary.trim() === "") {
    warnInvalidProduct(`${id}: summary is required.`);
    return null;
  }

  if (!Array.isArray(recommendationsValue)) {
    warnInvalidProduct(`${id}: recommendations must be an array.`);
    return null;
  }

  if (typeof active !== "boolean") {
    warnInvalidProduct(`${id}: active must be boolean.`);
    return null;
  }

  const recommendations = recommendationsValue
    .map((recommendation) => validateRecommendation(recommendation, id))
    .filter((recommendation): recommendation is ProductRecommendation =>
      Boolean(recommendation)
    );

  if (recommendations.length === 0) {
    warnInvalidProduct(`${id}: no valid recommendations.`);
    return null;
  }

  seenIds.add(id);

  return {
    id,
    brand,
    name,
    category,
    imageUrl:
      typeof value.imageUrl === "string" && value.imageUrl.trim()
        ? value.imageUrl
        : undefined,
    tags,
    summary,
    oliveYoungUrl:
      typeof value.oliveYoungUrl === "string" && value.oliveYoungUrl.trim()
        ? value.oliveYoungUrl
        : undefined,
    recommendations,
    active,
  };
}

export function getSkinProducts(): SkinProduct[] {
  const seenIds = new Set<string>();

  if (!Array.isArray(rawProducts)) {
    warnInvalidProduct("skin-products.json must be an array.");
    return [];
  }

  return rawProducts
    .map((product) => validateProduct(product, seenIds))
    .filter((product): product is SkinProduct => Boolean(product));
}

export function getRecommendedProducts(
  skinType: SkinTypeCode
): ResolvedRecommendedProduct[] {
  getSkinTypeInfo(skinType);

  return getSkinProducts()
    .filter((product) => product.active)
    .flatMap((product) =>
      product.recommendations
        .filter((recommendation) => recommendation.skinType === skinType)
        .map((recommendation) => ({
          product,
          recommendation,
        }))
    )
    .sort((a, b) => {
      if (a.recommendation.order !== b.recommendation.order) {
        return a.recommendation.order - b.recommendation.order;
      }

      return a.product.id.localeCompare(b.product.id);
    });
}

export function getRecommendedProductsByCategory(
  skinType: SkinTypeCode,
  category: ProductCategory
): ResolvedRecommendedProduct[] {
  return getRecommendedProducts(skinType).filter(
    ({ product }) => product.category === category
  );
}

export function getRecommendedProductGroups(
  skinType: SkinTypeCode
): Array<{
  category: ProductCategory;
  products: ResolvedRecommendedProduct[];
}> {
  return PRODUCT_CATEGORIES.map((category) => ({
    category,
    products: getRecommendedProductsByCategory(skinType, category),
  }));
}
