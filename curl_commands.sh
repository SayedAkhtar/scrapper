# USER INSERTIONS
curl -X POST -H "Content-Type: application/json" -d '[
{
"user_id": 1, 
"user_name": "user1", 
"name": "User One", 
"posts": 10, 
"followers": 100, 
"following": 200, 
"creation_date": "2023-06-01T00:00:00.000Z", 
"is_private": false, 
"is_verified": true, 
"is_business": false
}, 
{
"user_id": 2, 
"user_name": "user2", 
"name": "User Two", 
"posts": 20, 
"followers": 200, 
"following": 300, 
"creation_date": "2023-06-01T00:00:00.000Z", 
"is_private": true, 
"is_verified": false, 
"is_business": true
}, 
{
"user_id": 3, 
"user_name": "user3", 
"name": "User Three", 
"posts": 30, 
"followers": 300, 
"following": 400, 
"creation_date": "2023-06-01T00:00:00.000Z", 
"is_private": false, 
"is_verified": true, 
"is_business": false
}
]' http://localhost:5000/api/user

# REEL INSERTIONS
curl -X POST -H "Content-Type: application/json" -d '[
{
"user_id": 1, 
"user_name": "user1", 
"reel_id": "reel1", 
"hashtag": "#fun", 
"caption": "Having fun!", 
"reel_url": "http://example.com/reel1", 
"storage_url": "http://storage.com/reel1", 
"num_comments": 10, 
"num_likes": 100, 
"is_sponsored": false, 
"duration": "00:01:00", 
"text_identified": "Fun time", 
"key_emotions": "Happy, Excited", 
"quality_details": "High quality", 
"aspect_ratio_check": true, 
"transcription": "Having fun at the beach", 
"language_code": "en", 
"translation": "Having fun at the beach", 
"table_of_contents": "Fun at beach", 
"comments": ["Awesome", "Looks fun"], 
"created_at": "2023-06-01T00:00:00.000Z"
}, 
{
"user_id": 2, 
"user_name": "user2", 
"reel_id": "reel2", 
"hashtag": "#work", 
"caption": "Working hard!", 
"reel_url": "http://example.com/reel2", 
"storage_url": "http://storage.com/reel2", 
"num_comments": 20, 
"num_likes": 200, 
"is_sponsored": true, 
"duration": "00:02:00", 
"text_identified": "Work time", 
"key_emotions": "Focused, Determined", 
"quality_details": "Medium quality", 
"aspect_ratio_check": false, 
"transcription": "Working hard at the office", 
"language_code": "en", 
"translation": "Working hard at the office", 
"table_of_contents": "Work at office", 
"comments": ["Great job", "Keep it up"], 
"created_at": "2023-06-01T00:00:00.000Z"
}, 
{
"user_id": 3, 
"user_name": "user3", 
"reel_id": "reel3", 
"hashtag": "#travel", 
"caption": "Traveling the world!", 
"reel_url": "http://example.com/reel3", 
"storage_url": "http://storage.com/reel3", 
"num_comments": 30, 
"num_likes": 300, 
"is_sponsored": false, 
"duration": "00:03:00", 
"text_identified": "Travel time", 
"key_emotions": "Excited, Adventurous", 
"quality_details": "Low quality", 
"aspect_ratio_check": true, 
"transcription": "Traveling around the world", 
"language_code": "en", 
"translation": "Traveling around the world", 
"table_of_contents": "World travel", 
"comments": ["Amazing", "So cool"], 
"created_at": "2023-06-01T00:00:00.000Z"
}
]' http://localhost:5000/api/reel

#POST INSERTIONS
curl -X POST -H "Content-Type: application/json" -d '[
{
"user_id": 1, 
"user_name": "user1", 
"post_id": "post1", 
"hashtag": "#funpost", 
"caption": "Fun post!", 
"post_url": "http://example.com/post1", 
"storage_url": "http://storage.com/post1", 
"num_comments": 10, 
"num_likes": 100, 
"is_sponsored": false, 
"comments": ["Awesome post", "So fun"]
}, 
{
"user_id": 2, 
"user_name": "user2", 
"post_id": "post2", 
"hashtag": "#workpost", 
"caption": "Work post!", 
"post_url": "http://example.com/post2", 
"storage_url": "http://storage.com/post2", 
"num_comments": 20, 
"num_likes": 200, 
"is_sponsored": true, 
"comments": ["Great job", "Working hard"]
}, 
{
"user_id": 3, 
"user_name": "user3", 
"post_id": "post3", 
"hashtag": "#travelpost", 
"caption": "Travel post!", 
"post_url": "http://example.com/post3", 
"storage_url": "http://storage.com/post3", 
"num_comments": 30, 
"num_likes": 300, 
"is_sponsored": false, 
"comments": ["Amazing", "So cool"]
}
]' http://localhost:5000/api/post

#CREATE NEW RECORDS FOR TRACKING
curl -X POST -H "Content-Type: application/json" \
-d '{
    "user_id": 12345,
    "user_name": "johndoe",
    "processing_status": "none",
    "last_updated": "2023-06-01T10:00:00"
}' \
http://localhost:5000/api/tracking

#STATUS UPDATE OF THE USER
curl -X POST -H "Content-Type: application/json" \
-d '{
    "user_name": "johndoe",
    "processing_status": "processing"
}' \
http://localhost:5000/api/tracking


#GET PROCESING STATUS AS NONE
curl -X GET "http://localhost:5000/api/tracking?processing_status=none"

#GET PROCESSING STATUS BEFORE A DATE
curl -X GET "http://localhost:5000/api/tracking?before_date=2023-06-03T10:30:00"


# GET BY USER ID:
curl -X GET "http://localhost:5000/api/user?user_id=1,2"

# GET BY USER NAME
curl -X GET "http://localhost:5000/api/user?user_name=user1,user2"

# GET BY REEL_ID
curl -X GET "http://localhost:5000/api/reel?reel_id=reel1,reel2"

# GET REELS BY USER IDS
curl -X GET "http://localhost:5000/api/reel?user_id=1,2"

# GET REELS BY USER NAME
curl -X GET "http://localhost:5000/api/reel?user_name=user1,user2"

# GET POST BY POST IDS
curl -X GET "http://localhost:5000/api/post?post_id=post1,post2"

# GET POST BY USER IDS
curl -X GET "http://localhost:5000/api/post?user_id=1,2"

# GET POSTS BY USER NAME
curl -X GET "http://localhost:5000/api/post?user_name=user1,user2"
