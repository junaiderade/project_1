const AWS = require('aws-sdk');
const { application } = require('express');
const path = require('path');
require('dotenv').config();


AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyID: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const dynamo_client = new AWS.DynamoDB.DocumentClient();//the document client makes it easier to work with native js

const TABLE_NAME = 'project_1_items'

const add_item = async (item) => { //this function returns a promise becuase in your route, you wait on the promise returned here to be resolved
    const params = {
        TableName: TABLE_NAME,
        Item: item        //only the primary key attributes are required in the item, which is an object
    }
    return await dynamo_client.put(params).promise();
}

const get_user_items = async (email) => {
    const params = {
        TableName: TABLE_NAME,
        FilterExpression: "email = :a",
        ExpressionAttributeValues: {
            ":a": email
        }
    }
    const items = await dynamo_client.scan(params).promise();//when a promise becomes resolved, it has a value, in this case it becomes the value of the items
    return items;
}

const delete_item = async (item) => { 
    const params = {
        TableName: TABLE_NAME,
        Key: item
    }
    return await dynamo_client.delete(params).promise();
}

module.exports = {
    add_item,
    get_user_items,
    delete_item
}

/* commented out code
    dynamo_client.scan(params, (err,data) => {
        if(err){
            console.log(err);
        }else{
            console.log(data);
        }
    });

*/