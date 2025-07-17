## Auth
- betterAuth

## User Profile
- GET `/me`
- GET `/myApplications`
- GET `/myProjects`
- POST `/verifyEmail`

## Projects
- GET `/projects/all` (infinite scrolling)
- GET `/applications` (list all applications sent by people to join as a contributor)
- POST `/[projectId]/apply` (applying as a contributor to a specific project)
- PUT `/[projectId]/vote` (vote a specific project)
- DELETE /[projectId]`

## Swiped
- POST `/[projectId]/rightSwipe` (add this project to user's likedProjects and increment the vote count for this project) 
- POST `/[projectId]/leftSwipe` (add this project to user's notLikedProjects)

## Match and For You Page (fyp)
- POST `/match` (match current user with all projects using the algorithm)

### More endpoints will be added as I build this project. All of the new endpoints will be documented accordingly

