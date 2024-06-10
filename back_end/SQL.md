# User Table
| Field      | Type         | Null | Key | Default | Extra |
|------------|--------------|------|-----|---------|-------|
| created_at | datetime     | YES  |     | NULL    |       |
| updated_at | datetime     | YES  |     | NULL    |       |
| deleted_at | datetime     | YES  |     | NULL    |       |
| family_id  | varchar(255) | NO   |     | NULL    |       |
| citizen_id | varchar(255) | NO   | PRI | NULL    |       |
| name       | text         | NO   |     | NULL    |       |
| dob        | text         | YES  |     | NULL    |       |
| contact    | text         | NO   |     | NULL    |       |
| gender     | text         | NO   |     | NULL    |       |
| room_id    | int          | NO   |     | NULL    |       |
| relation   | text         | YES  |     | NULL    |       |
| status     | text         | YES  |     | NULL    |       |
# Citizen Table
| Field      | Type         | Null | Key | Default | Extra |
|------------|--------------|------|-----|---------|-------|
| created_at | datetime     | YES  |     | NULL    |       |
| updated_at | datetime     | YES  |     | NULL    |       |
| deleted_at | datetime     | YES  |     | NULL    |       |
| family_id  | varchar(255) | NO   |     | NULL    |       |
| citizen_id | varchar(255) | NO   | PRI | NULL    |       |
| name       | text         | NO   |     | NULL    |       |
| dob        | text         | YES  |     | NULL    |       |
| contact    | text         | NO   |     | NULL    |       |
| gender     | text         | NO   |     | NULL    |       |
| room_id    | int          | NO   |     | NULL    |       |
| relation   | text         | YES  |     | NULL    |       |
| status     | text         | YES  |     | NULL    |       |
# Room Table
| Field      | Type     | Null | Key | Default | Extra |
|------------|----------|------|-----|---------|-------|
| created_at | datetime | YES  |     | NULL    |       |
| updated_at | datetime | YES  |     | NULL    |       |
| deleted_at | datetime | YES  |     | NULL    |       |
| family_id  | text     | YES  |     | NULL    |       |
| room_id    | int      | NO   | PRI | NULL    |       |
| area       | int      | NO   |     | NULL    |       |
| own_time   | text     | YES  |     | NULL    |       |
| owner_id   | text     | YES  |     | NULL    |       |
| owner_name | text     | YES  |     | NULL    |       |
| status     | text     | YES  |     | NULL    |       |
# Fee Table
| Field      | Type         | Null | Key | Default | Extra |
|------------|--------------|------|-----|---------|-------|
| created_at | datetime     | YES  |     | NULL    |       |
| updated_at | datetime     | YES  |     | NULL    |       |
| deleted_at | datetime     | YES  |     | NULL    |       |
| fee_type   | text         | NO   |     | NULL    |       |
| fee_desc   | text         | NO   |     | NULL    |       |
| fee_month  | text         | NO   |     | NULL    |       |
| fee_cost   | bigint       | NO   |     | NULL    |       |
| room_id    | int          | NO   |     | NULL    |       |
| date       | text         | NO   |     | NULL    |       |
| status     | varchar(255) | NO   |     | NULL    |       |
| fee_id     | varchar(255) | NO   | PRI | NULL    |       |

# Bill Table
| Field       | Type         | Null | Key | Default | Extra |
|-------------|--------------|------|-----|---------|-------|
| created_at  | datetime     | YES  |     | NULL    |       |
| updated_at  | datetime     | YES  |     | NULL    |       |
| deleted_at  | datetime     | YES  |     | NULL    |       |
| bill_type   | text         | NO   |     | NULL    |       |
| bill_id     | varchar(255) | NO   | PRI | NULL    |       |
| bill_month  | text         | NO   |     | NULL    |       |
| bill_amount | int          | YES  |     | NULL    |       |
| bill_cost   | bigint       | NO   |     | NULL    |       |
| customer_id | varchar(255) | NO   |     | NULL    |       |
| date        | text         | NO   |     | NULL    |       |
| status      | varchar(255) | NO   |     | NULL    |       |
# Request Table
| Field      | Type         | Null | Key | Default | Extra          |
|------------|--------------|------|-----|---------|----------------|
| id         | int unsigned | NO   | PRI | NULL    | auto_increment |
| created_at | datetime     | YES  |     | NULL    |                |
| updated_at | datetime     | YES  |     | NULL    |                |
| deleted_at | datetime     | YES  | MUL | NULL    |                |
| status     | text         | NO   |     | NULL    |                |
| user_id    | text         | NO   |     | NULL    |                |
| title      | text         | NO   |     | NULL    |                |
| message    | text         | NO   |     | NULL    |                |
| reply      | text         | YES  |     | NULL    |                |
| note       | text         | YES  |     | NULL    |                |
# Notification Table
| Field      | Type         | Null | Key | Default | Extra          |
|------------|--------------|------|-----|---------|----------------|
| id         | int unsigned | NO   | PRI | NULL    | auto_increment |
| created_at | datetime     | YES  |     | NULL    |                |
| updated_at | datetime     | YES  |     | NULL    |                |
| deleted_at | datetime     | YES  | MUL | NULL    |                |
| title      | text         | NO   |     | NULL    |                |
| content    | text         | NO   |     | NULL    |                |
| user_id    | text         | YES  |     | NULL    |                |

# Vehicle Table
| Field        | Type         | Null | Key | Default | Extra |
|--------------|--------------|------|-----|---------|-------|
| created_at   | datetime     | YES  |     | NULL    |       |
| updated_at   | datetime     | YES  |     | NULL    |       |
| deleted_at   | datetime     | YES  |     | NULL    |       |
| vehicle_name | varchar(255) | NO   | PRI | NULL    |       |
| vehicle_type | text         | NO   |     | NULL    |       |
| vehicle_id   | varchar(255) | NO   | UNI | NULL    |       |
| room_id      | int          | NO   |     | NULL    |       |
| owner_id     | text         | NO   |     | NULL    |       |
| owner_name   | text         | NO   |     | NULL    |       |
| vehicle_fee  | int          | NO   |     | NULL    |       |
# Donation table
| Field          | Type         | Null | Key | Default | Extra |
|----------------|--------------|------|-----|---------|-------|
| created_at     | datetime     | YES  |     | NULL    |       |
| updated_at     | datetime     | YES  |     | NULL    |       |
| deleted_at     | datetime     | YES  |     | NULL    |       |
| donation_id    | varchar(255) | NO   | PRI | NULL    |       |
| donation_type  | text         | NO   |     | NULL    |       |
| donation_desc  | text         | NO   |     | NULL    |       |
| donation_month | text         | NO   |     | NULL    |       |
| donation_cost  | bigint       | NO   |     | NULL    |       |
| room_id        | int          | NO   |     | NULL    |       |
| status         | varchar(255) | NO   |     | NULL    |       |