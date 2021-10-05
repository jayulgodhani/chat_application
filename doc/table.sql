CREATE TABLE chat_schema.channel (
	channel_id serial PRIMARY KEY,
	buyer_id int8 NOT NULL,
	seller_id int8 NOT NULL,
	nft_id int8 NOT NULL,
	created_dt timestamptz NOT NULL,
	updated_dt timestamptz NOT NULL
);

CREATE TABLE chat_schema.message (
	message_id serial PRIMARY KEY,
	channel_id int8 NOT NULL,
	sender_id int8 NOT NULL,
	message text NOT NULL,
	created_dt timestamptz NOT NULL,
	CONSTRAINT fk_channel_id FOREIGN KEY (channel_id) REFERENCES chat_schema.channel(channel_id)
);