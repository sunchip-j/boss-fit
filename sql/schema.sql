CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS questions (
    id BIGSERIAL PRIMARY KEY,
    question_text TEXT NOT NULL,
    question_type VARCHAR(50),
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS choices (
    id BIGSERIAL PRIMARY KEY,
    question_id BIGINT NOT NULL,
    choice_text TEXT NOT NULL,
    display_order INT NOT NULL DEFAULT 0,
    sense_score INT NOT NULL DEFAULT 0,
    report_score INT NOT NULL DEFAULT 0,
    reaction_score INT NOT NULL DEFAULT 0,
    distance_score INT NOT NULL DEFAULT 0,
    survival_score INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS result_types (
    id BIGSERIAL PRIMARY KEY,
    code VARCHAR(50) NOT NULL,
    title VARCHAR(100) NOT NULL,
    subtitle TEXT,
    description TEXT,
    min_score INT NOT NULL,
    max_score INT NOT NULL,
    image_url TEXT,
    share_text TEXT,
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS test_sessions (
    id BIGSERIAL PRIMARY KEY,
    session_key UUID NOT NULL DEFAULT gen_random_uuid(),
    boss_mbti VARCHAR(4) NOT NULL,
    user_gender VARCHAR(20),
    sense_score INT NOT NULL DEFAULT 0,
    report_score INT NOT NULL DEFAULT 0,
    reaction_score INT NOT NULL DEFAULT 0,
    distance_score INT NOT NULL DEFAULT 0,
    survival_score INT NOT NULL DEFAULT 0,
    total_score INT,
    result_type_id BIGINT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS test_answers (
    id BIGSERIAL PRIMARY KEY,
    session_id BIGINT NOT NULL,
    question_id BIGINT NOT NULL,
    choice_id BIGINT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_questions_active ON questions(is_active);
CREATE INDEX IF NOT EXISTS idx_choices_question_id ON choices(question_id);
CREATE INDEX IF NOT EXISTS idx_test_sessions_session_key ON test_sessions(session_key);
CREATE INDEX IF NOT EXISTS idx_test_answers_session_id ON test_answers(session_id);
