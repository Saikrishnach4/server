const AWS = require('aws-sdk');
const uuid = require('uuid');
const dotenv = require('dotenv');

dotenv.config();
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});
AWS.config.region = process.env.AWS_REGION;
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const createTask = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    const userId = req.params.userId;

    const taskId = uuid.v4();

    const params = {
      TableName: 'devtown',
      Item: {
        saikrishna: userId,
        'saikrishna@3': taskId,
        userId: userId,
        title,
        description,
        dueDate,
      },
    };

    await dynamoDB.put(params).promise();

    res.status(201).json({ message: 'Task created successfully', taskId });
  } catch (error) {
    console.error('Error creating task:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const userId = req.params.userId;
    const params = {
      TableName: 'devtown',
      KeyConditionExpression: 'saikrishna = :userId',
      ExpressionAttributeValues: {
        ':userId': userId,
      },
    };
    const tasks = await dynamoDB.query(params).promise();
    res.json(tasks.Items);
  } catch (error) {
    console.error('Error getting tasks:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateTask = async (req, res) => {
  const userId = req.params.userId;
  const { title, description, dueDate, taskId } = req.body;

  const params = {
    TableName: 'devtown',
    Key: {
      saikrishna: userId,
      'saikrishna@3': taskId,
    },
    UpdateExpression: 'set title = :t, description = :d, dueDate = :dd',
    ExpressionAttributeValues: {
      ':t': title,
      ':d': description,
      ':dd': dueDate,
    },
    ReturnValues: 'UPDATED_NEW',
  };

  try {
    await dynamoDB.update(params).promise();
    res.json({ message: 'Task updated successfully' });
  } catch (error) {
    console.error('Error updating task:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteTask = async (req, res) => {
  const userId = req.params.userId; 
  const taskId = req.body.taskId;
  console.log(req)
console.log(userId,taskId)
  const params = {
    TableName: 'devtown',
    Key: {
      saikrishna: userId,
      'saikrishna@3': taskId,
    },
  };

  try {
    await dynamoDB.delete(params).promise();
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};
