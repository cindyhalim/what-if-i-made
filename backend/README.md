# what if i made - backend

- built with Django Rest Framework and Beautiful Soup
- deploy to AWS with [Zappa](https://github.com/zappa/Zappa) via Docker and ECR

### **initial deploy:**

- build Docker image by running:
  ```
  zappa save-python-settings-file api
  docker build -t what-if-i-made:latest .
  ```
- create ECR repo and retrieve the ECR repo URI:
  ```
  aws ecr create-repository --repository-name what-if-i-made --image-scanning-configuration scanOnPush=true
  ```
- push to ECR by running:

  ```
  docker tag what-if-i-made:latest XXXXX.dkr.ecr.us-east-1.amazonaws.com/what-if-i-made:latest

  # get authenticated to push to ECR
  aws ecr get-login-password | docker login --username AWS --password-stdin XXXXX.dkr.ecr.us-east-1.amazonaws.com


  docker push XXXXX.dkr.ecr.us-east-1.amazonaws.com/what-if-i-made:latest
  ```

- deploy with Zappa by running:
  ```
  zappa deploy api -d XXXXX.dkr.ecr.us-east-1.amazonaws.com/what-if-i-made:latest`
  ```
- don't forget to add the domain to `ALLOWED_HOSTS` in `api/settings.py`

### **making updates:**

when making changes to your application code, run the following script with your ECR repo URI:

```
./update.sh <ECR_repo_URI>
```

might have to allow access first:

```
chmod +x ./update.sh
```

### **resources:**

- [Serverless Docker on AWS Lambda with Zappa](https://ianwhitestone.work/zappa-serverless-docker/)
