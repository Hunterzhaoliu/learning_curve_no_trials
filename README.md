# Learning Curve Expectations

### MongoDB Atlas

- Setup: `brew install mongo`

- How to import data from a csv file: `mongoimport --host Cluster0-shard-0/cluster0-shard-00-00-gaqbs.mongodb.net:27017,cluster0-shard-00-01-gaqbs.mongodb.net:27017,cluster0-shard-00-02-gaqbs.mongodb.net:27017 --ssl --username changing_brain_lab --password <PASSWORD> --authenticationDatabase admin --db learning_curve --collection subjects --type file_type --headerline --file file_name`

- How to export data to a csv file: `mongoexport --host Cluster0-shard-0/cluster0-shard-00-00-gaqbs.mongodb.net:27017,cluster0-shard-00-01-gaqbs.mongodb.net:27017,cluster0-shard-00-02-gaqbs.mongodb.net:27017 --ssl --username changing_brain_lab --password <PASSWORD> --authenticationDatabase admin --db learning_curve --collection collection_name --type file_type --fields field_to_include_if_csv_file --out file_name --forceTableScan`

### Website

- Setup:

1. Install node and node package manager (npm): https://nodejs.org/en/download/

- `node -v` = 8.9.3
- `npm -v` = 5.6.0

2. Clone remote github repo
3. Get config files
4. `npm install`

### Deployment checklist

1.  If first time:

- `heroku login`
- `git remote add heroku`

2.  `git checkout master`
3.  Push to Github: `git push origin master`
4.  Push to Heroku: `git push heroku master`
5.  Check deployment at
