# aws-static-page

Simple static web page (an online message diary) is a dummy appliccation on AWS, based on AWS samples and tutrials. No valuable service or functionality is provided by the app itself. Technologies used and practiced:
  - AWS Cognito - auth services
  - AWS S3  - stoirage of static files
  - AVS API Gateway - scan/put data from/to frontend
  - AVS Lambda  - triggered by API Gateway and access to DynamoDB
  - AVS DynamoDB  - storage of user's notes
  - AWS CodePipeline  - GitHub WebHook to auto-update AWS S3 on GitHub master merge/commit
  ----------------------------------------------------------------------------------------
  NOTE ON COMMITS:
  All commits to this repository trigger auto-deployment on AWS S3.
  ----------------------------------------------------------------------------------------
  
  ### CodePipeline Source Config:
  
  ![Screenshot of codepipeline](https://cc-test-task-andriy-borovets.s3.eu-central-1.amazonaws.com/images/sourceconfigscreen.png)
  
  ### CodePipeline Deployment config:
  
  ![Screenshot of codepipeline](https://cc-test-task-andriy-borovets.s3.eu-central-1.amazonaws.com/images/deployconfigscreen.png)
  
  ### Screen of CodePipeline in progress:
  
  ![Screenshot of codepipeline](https://cc-test-task-andriy-borovets.s3.eu-central-1.amazonaws.com/images/codePipelineProgress.png)

  ### Screen of CodePipeline finished:
  
  ![Screenshot of codepipeline](https://cc-test-task-andriy-borovets.s3.eu-central-1.amazonaws.com/images/codePipeLineFinished.png)
