const mongoose = require('mongoose');
const Question = require('../models/Question');

require('dotenv').config();

// Function to shuffle an array (Fisher-Yates shuffle)
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected for seeding'))
  .catch((err) => console.error('MongoDB connection error:', err));
const questions = {
  react: {
    basic: [
      {
        question: 'What is React primarily used for?',
        options: ['Building user interfaces', 'Managing databases', 'Server-side routing', 'Creating REST APIs'],
        correctAnswer: 'Building user interfaces',
        category: 'react',
        difficulty: 'basic'
      },
      {
        question: 'What is a React component?',
        options: ['A reusable piece of UI', 'A database model', 'A server endpoint', 'A CSS stylesheet'],
        correctAnswer: 'A reusable piece of UI',
        category: 'react',
        difficulty: 'basic'
      },
      {
        question: 'How do you create a functional component in React?',
        options: [
          'function MyComponent() { return <div>Hello</div>; }',
          'class MyComponent extends React.Component { render() { return <div>Hello</div>; } }',
          'const MyComponent = () => { console.log("Hello"); };',
          'function MyComponent() { return "Hello"; }'
        ],
        correctAnswer: 'function MyComponent() { return <div>Hello</div>; }',
        category: 'react',
        difficulty: 'basic'
      },
      {
        question: 'What is JSX in React?',
        options: ['A syntax extension for JavaScript', 'A database query language', 'A CSS preprocessor', 'A server-side framework'],
        correctAnswer: 'A syntax extension for JavaScript',
        category: 'react',
        difficulty: 'basic'
      },
      {
        question: 'What does the useState hook do in React?',
        options: ['Manages state in functional components', 'Fetches data from an API', 'Handles routing', 'Styles components'],
        correctAnswer: 'Manages state in functional components',
        category: 'react',
        difficulty: 'basic'
      },
      {
        question: 'What is the purpose of props in React?',
        options: ['To pass data to components', 'To manage state', 'To style components', 'To handle events'],
        correctAnswer: 'To pass data to components',
        category: 'react',
        difficulty: 'basic'
      },
      {
        question: 'How do you render a React component?',
        options: ['Using ReactDOM.render()', 'Using component.render()', 'Using app.render()', 'Using React.renderComponent()'],
        correctAnswer: 'Using ReactDOM.render()',
        category: 'react',
        difficulty: 'basic'
      },
      {
        question: 'What is the default export in a React component file?',
        options: ['The main component', 'A CSS file', 'A database connection', 'A server route'],
        correctAnswer: 'The main component',
        category: 'react',
        difficulty: 'basic'
      },
      {
        question: 'What does the React.Fragment component do?',
        options: ['Groups children without adding extra nodes', 'Renders a single child', 'Handles state', 'Fetches data'],
        correctAnswer: 'Groups children without adding extra nodes',
        category: 'react',
        difficulty: 'basic'
      },
      {
        question: 'What is the virtual DOM in React?',
        options: ['A lightweight copy of the real DOM', 'A database schema', 'A server-side model', 'A CSS framework'],
        correctAnswer: 'A lightweight copy of the real DOM',
        category: 'react',
        difficulty: 'basic'
      }
    ],
    intermediate: [
      {
        question: 'How do you pass data from a parent to a child component in React?',
        options: ['Using props', 'Using state', 'Using context', 'Using Redux'],
        correctAnswer: 'Using props',
        category: 'react',
        difficulty: 'intermediate'
      },
      {
        question: 'What is the purpose of the useEffect hook?',
        options: ['To perform side effects in functional components', 'To manage component state', 'To create new components', 'To handle routing'],
        correctAnswer: 'To perform side effects in functional components',
        category: 'react',
        difficulty: 'intermediate'
      },
      {
        question: 'What is a controlled component in React?',
        options: ['A component whose form data is handled by state', 'A component that uses Redux', 'A component with no props', 'A component that renders conditionally'],
        correctAnswer: 'A component whose form data is handled by state',
        category: 'react',
        difficulty: 'intermediate'
      },
      {
        question: 'How can you optimize a React application’s performance?',
        options: ['Using React.memo for components', 'Increasing component state', 'Adding more event listeners', 'Using inline styles'],
        correctAnswer: 'Using React.memo for components',
        category: 'react',
        difficulty: 'intermediate'
      },
      {
        question: 'What is the React Context API used for?',
        options: ['Sharing data across components without prop drilling', 'Managing component lifecycle', 'Creating animations', 'Handling HTTP requests'],
        correctAnswer: 'Sharing data across components without prop drilling',
        category: 'react',
        difficulty: 'intermediate'
      },
      {
        question: 'What does the useCallback hook do?',
        options: ['Memoizes functions to prevent unnecessary renders', 'Manages state', 'Fetches data', 'Handles events'],
        correctAnswer: 'Memoizes functions to prevent unnecessary renders',
        category: 'react',
        difficulty: 'intermediate'
      },
      {
        question: 'How do you conditionally render a component in React?',
        options: ['Using ternary operators or &&', 'Using switch statements', 'Using try-catch', 'Using for loops'],
        correctAnswer: 'Using ternary operators or &&',
        category: 'react',
        difficulty: 'intermediate'
      },
      {
        question: 'What is the purpose of the useRef hook?',
        options: ['To persist values across renders', 'To manage state', 'To fetch data', 'To handle routing'],
        correctAnswer: 'To persist values across renders',
        category: 'react',
        difficulty: 'intermediate'
      },
      {
        question: 'How do you handle events in React?',
        options: ['Using event handlers like onClick', 'Using addEventListener', 'Using event.preventDefault', 'Using Redux actions'],
        correctAnswer: 'Using event handlers like onClick',
        category: 'react',
        difficulty: 'intermediate'
      },
      {
        question: 'What is a key prop used for in React lists?',
        options: ['To uniquely identify elements', 'To style list items', 'To sort lists', 'To filter lists'],
        correctAnswer: 'To uniquely identify elements',
        category: 'react',
        difficulty: 'intermediate'
      }
    ],
    hard: [
      {
        question: 'What is the significance of the key prop in React lists?',
        options: ['It helps React efficiently update the DOM', 'It styles list items', 'It triggers lifecycle methods', 'It handles form submissions'],
        correctAnswer: 'It helps React efficiently update the DOM',
        category: 'react',
        difficulty: 'hard'
      },
      {
        question: 'How does React’s reconciliation process work?',
        options: ['It compares the virtual DOM with the real DOM to apply minimal updates', 'It reloads the entire page', 'It fetches new data from the server', 'It re-renders all components'],
        correctAnswer: 'It compares the virtual DOM with the real DOM to apply minimal updates',
        category: 'react',
        difficulty: 'hard'
      },
      {
        question: 'What is a higher-order component (HOC) in React?',
        options: ['A function that takes a component and returns a new component', 'A component that renders other components', 'A component with multiple states', 'A component that uses hooks'],
        correctAnswer: 'A function that takes a component and returns a new component',
        category: 'react',
        difficulty: 'hard'
      },
      {
        question: 'How do you handle errors in React components?',
        options: ['Using Error Boundaries', 'Using try-catch in render', 'Using useEffect', 'Using Redux middleware'],
        correctAnswer: 'Using Error Boundaries',
        category: 'react',
        difficulty: 'hard'
      },
      {
        question: 'What is the purpose of React Suspense?',
        options: ['To handle asynchronous rendering and data fetching', 'To manage component state', 'To create animations', 'To handle routing'],
        correctAnswer: 'To handle asynchronous rendering and data fetching',
        category: 'react',
        difficulty: 'hard'
      },
      {
        question: 'What is the Concurrent Rendering feature in React 18?',
        options: ['Allows rendering tasks to be interrupted for better performance', 'Renders all components at once', 'Disables hooks', 'Manages server-side rendering'],
        correctAnswer: 'Allows rendering tasks to be interrupted for better performance',
        category: 'react',
        difficulty: 'hard'
      },
      {
        question: 'How does the useReducer hook differ from useState?',
        options: ['It’s better for complex state logic', 'It’s used for styling', 'It handles routing', 'It fetches data'],
        correctAnswer: 'It’s better for complex state logic',
        category: 'react',
        difficulty: 'hard'
      },
      {
        question: 'What is the purpose of React Portals?',
        options: ['To render children into a different DOM node', 'To manage state', 'To handle events', 'To optimize performance'],
        correctAnswer: 'To render children into a different DOM node',
        category: 'react',
        difficulty: 'hard'
      },
      {
        question: 'How do you implement code-splitting in React?',
        options: ['Using React.lazy and Suspense', 'Using useEffect', 'Using Redux', 'Using CSS modules'],
        correctAnswer: 'Using React.lazy and Suspense',
        category: 'react',
        difficulty: 'hard'
      },
      {
        question: 'What is the purpose of the useTransition hook in React 18?',
        options: ['To manage non-urgent UI updates', 'To handle form submissions', 'To fetch data', 'To style components'],
        correctAnswer: 'To manage non-urgent UI updates',
        category: 'react',
        difficulty: 'hard'
      }
    ]
  },
  express: {
    basic: [
      {
        question: 'What is Express.js?',
        options: ['A web application framework for Node.js', 'A front-end library', 'A database management system', 'A CSS framework'],
        correctAnswer: 'A web application framework for Node.js',
        category: 'express',
        difficulty: 'basic'
      },
      {
        question: 'How do you create an Express application?',
        options: [
          'const app = require("express")();',
          'const app = new Express();',
          'const app = express.createApp();',
          'const app = require("http").createServer();'
        ],
        correctAnswer: 'const app = require("express")();',
        category: 'express',
        difficulty: 'basic'
      },
      {
        question: 'What does app.get() do in Express?',
        options: ['Handles HTTP GET requests', 'Fetches data from a database', 'Sends an HTTP POST request', 'Renders a template'],
        correctAnswer: 'Handles HTTP GET requests',
        category: 'express',
        difficulty: 'basic'
      },
      {
        question: 'What is middleware in Express?',
        options: ['Functions that process requests and responses', 'A database connector', 'A front-end component', 'A routing protocol'],
        correctAnswer: 'Functions that process requests and responses',
        category: 'express',
        difficulty: 'basic'
      },
      {
        question: 'How do you start an Express server?',
        options: ['app.listen(port);', 'app.start(port);', 'app.run(port);', 'app.serve(port);'],
        correctAnswer: 'app.listen(port);',
        category: 'express',
        difficulty: 'basic'
      },
      {
        question: 'What is the purpose of res.send() in Express?',
        options: ['Sends a response to the client', 'Fetches data', 'Defines a route', 'Parses JSON'],
        correctAnswer: 'Sends a response to the client',
        category: 'express',
        difficulty: 'basic'
      },
      {
        question: 'How do you define a route in Express?',
        options: ['Using app.method(path, handler)', 'Using route.define()', 'Using res.route()', 'Using req.path()'],
        correctAnswer: 'Using app.method(path, handler)',
        category: 'express',
        difficulty: 'basic'
      },
      {
        question: 'What does req.params contain in Express?',
        options: ['URL route parameters', 'Query string parameters', 'Request body', 'HTTP headers'],
        correctAnswer: 'URL route parameters',
        category: 'express',
        difficulty: 'basic'
      },
      {
        question: 'What is the role of app.use() in Express?',
        options: ['Mounts middleware functions', 'Defines routes', 'Sends responses', 'Parses requests'],
        correctAnswer: 'Mounts middleware functions',
        category: 'express',
        difficulty: 'basic'
      },
      {
        question: 'How do you handle a POST request in Express?',
        options: ['Using app.post()', 'Using app.get()', 'Using res.post()', 'Using req.post()'],
        correctAnswer: 'Using app.post()',
        category: 'express',
        difficulty: 'basic'
      }
    ],
    intermediate: [
      {
        question: 'How do you handle query parameters in Express?',
        options: ['Using req.query', 'Using req.params', 'Using req.body', 'Using req.headers'],
        correctAnswer: 'Using req.query',
        category: 'express',
        difficulty: 'intermediate'
      },
      {
        question: 'What is the purpose of express.Router()?',
        options: ['To create modular route handlers', 'To manage database connections', 'To render templates', 'To handle CORS'],
        correctAnswer: 'To create modular route handlers',
        category: 'express',
        difficulty: 'intermediate'
      },
      {
        question: 'How do you serve static files in Express?',
        options: ['Using express.static()', 'Using app.serve()', 'Using res.sendFile()', 'Using app.useStatic()'],
        correctAnswer: 'Using express.static()',
        category: 'express',
        difficulty: 'intermediate'
      },
      {
        question: 'What does next() do in Express middleware?',
        options: ['Passes control to the next middleware function', 'Sends a response to the client', 'Stops the request cycle', 'Redirects the request'],
        correctAnswer: 'Passes control to the next middleware function',
        category: 'express',
        difficulty: 'intermediate'
      },
      {
        question: 'How do you handle errors in Express?',
        options: ['Using error-handling middleware', 'Using try-catch in routes', 'Using res.error()', 'Using app.error()'],
        correctAnswer: 'Using error-handling middleware',
        category: 'express',
        difficulty: 'intermediate'
      },
      {
        question: 'How do you parse JSON request bodies in Express?',
        options: ['Using express.json()', 'Using req.parseJSON()', 'Using res.json()', 'Using body-parser.json()'],
        correctAnswer: 'Using express.json()',
        category: 'express',
        difficulty: 'intermediate'
      },
      {
        question: 'What is the purpose of res.status() in Express?',
        options: ['Sets the HTTP status code', 'Sends a response', 'Parses the request', 'Defines a route'],
        correctAnswer: 'Sets the HTTP status code',
        category: 'express',
        difficulty: 'intermediate'
      },
      {
        question: 'How do you redirect a request in Express?',
        options: ['Using res.redirect()', 'Using res.sendRedirect()', 'Using req.redirect()', 'Using app.redirect()'],
        correctAnswer: 'Using res.redirect()',
        category: 'express',
        difficulty: 'intermediate'
      },
      {
        question: 'What is CORS in Express, and how is it enabled?',
        options: [
          'Cross-Origin Resource Sharing, enabled with cors middleware',
          'A routing protocol, enabled with app.use()',
          'A security feature, enabled with helmet',
          'A database connector, enabled with mongoose'
        ],
        correctAnswer: 'Cross-Origin Resource Sharing, enabled with cors middleware',
        category: 'express',
        difficulty: 'intermediate'
      },
      {
        question: 'How do you handle URL-encoded form data in Express?',
        options: ['Using express.urlencoded()', 'Using req.form()', 'Using res.form()', 'Using body-parser.form()'],
        correctAnswer: 'Using express.urlencoded()',
        category: 'express',
        difficulty: 'intermediate'
      }
    ],
    hard: [
      {
        question: 'How do you implement rate limiting in Express?',
        options: ['Using the express-rate-limit middleware', 'Using res.limit()', 'Using app.rateLimit()', 'Using req.throttle()'],
        correctAnswer: 'Using the express-rate-limit middleware',
        category: 'express',
        difficulty: 'hard'
      },
      {
        question: 'What is the purpose of the Helmet middleware in Express?',
        options: ['To secure apps by setting HTTP headers', 'To compress responses', 'To parse JSON bodies', 'To manage sessions'],
        correctAnswer: 'To secure apps by setting HTTP headers',
        category: 'express',
        difficulty: 'hard'
      },
      {
        question: 'How do you implement WebSocket support in Express?',
        options: ['Using the ws library with Express', 'Using express.websocket()', 'Using app.socket()', 'Using res.stream()'],
        correctAnswer: 'Using the ws library with Express',
        category: 'express',
        difficulty: 'hard'
      },
      {
        question: 'What is the benefit of clustering in Express applications?',
        options: ['It improves performance by utilizing multiple CPU cores', 'It reduces database load', 'It simplifies routing', 'It enhances client-side rendering'],
        correctAnswer: 'It improves performance by utilizing multiple CPU cores',
        category: 'express',
        difficulty: 'hard'
      },
      {
        question: 'How do you handle file uploads in Express?',
        options: ['Using the multer middleware', 'Using express.upload()', 'Using req.files', 'Using res.upload()'],
        correctAnswer: 'Using the multer middleware',
        category: 'express',
        difficulty: 'hard'
      },
      {
        question: 'What is the purpose of the compression middleware in Express?',
        options: ['To reduce response size with gzip', 'To parse JSON', 'To secure routes', 'To handle sessions'],
        correctAnswer: 'To reduce response size with gzip',
        category: 'express',
        difficulty: 'hard'
      },
      {
        question: 'How do you implement session management in Express?',
        options: ['Using express-session middleware', 'Using req.session()', 'Using res.session()', 'Using app.session()'],
        correctAnswer: 'Using express-session middleware',
        category: 'express',
        difficulty: 'hard'
      },
      {
        question: 'What is the role of the morgan middleware in Express?',
        options: ['Logging HTTP requests', 'Parsing JSON', 'Handling file uploads', 'Securing routes'],
        correctAnswer: 'Logging HTTP requests',
        category: 'express',
        difficulty: 'hard'
      },
      {
        question: 'How do you secure an Express API with JWT?',
        options: ['Using jsonwebtoken and middleware', 'Using express-jwt', 'Using req.auth()', 'Using res.secure()'],
        correctAnswer: 'Using jsonwebtoken and middleware',
        category: 'express',
        difficulty: 'hard'
      },
      {
        question: 'What is the benefit of using environment variables in Express?',
        options: ['To manage configuration securely', 'To style routes', 'To parse requests', 'To handle events'],
        correctAnswer: 'To manage configuration securely',
        category: 'express',
        difficulty: 'hard'
      }
    ]
  },
  mongodb: {
    basic: [
      {
        question: 'What is MongoDB?',
        options: ['A NoSQL database', 'A relational database', 'A front-end framework', 'A server framework'],
        correctAnswer: 'A NoSQL database',
        category: 'mongodb',
        difficulty: 'basic'
      },
      {
        question: 'What is a collection in MongoDB?',
        options: ['A group of documents', 'A single document', 'A database table', 'A query'],
        correctAnswer: 'A group of documents',
        category: 'mongodb',
        difficulty: 'basic'
      },
      {
        question: 'How do you insert a document in MongoDB?',
        options: ['Using db.collection.insertOne()', 'Using db.collection.add()', 'Using db.collection.create()', 'Using db.collection.push()'],
        correctAnswer: 'Using db.collection.insertOne()',
        category: 'mongodb',
        difficulty: 'basic'
      },
      {
        question: 'What is the primary key in a MongoDB document?',
        options: ['_id', 'id', 'key', 'primary'],
        correctAnswer: '_id',
        category: 'mongodb',
        difficulty: 'basic'
      },
      {
        question: 'What is a MongoDB document?',
        options: ['A JSON-like data structure', 'A SQL table', 'A CSS file', 'A JavaScript function'],
        correctAnswer: 'A JSON-like data structure',
        category: 'mongodb',
        difficulty: 'basic'
      },
      {
        question: 'How do you connect to MongoDB in Node.js?',
        options: ['Using mongoose.connect()', 'Using mongodb.connect()', 'Using db.connect()', 'Using connect.mongodb()'],
        correctAnswer: 'Using mongoose.connect()',
        category: 'mongodb',
        difficulty: 'basic'
      },
      {
        question: 'What does db.collection.findOne() do?',
        options: ['Returns a single document', 'Returns all documents', 'Updates a document', 'Deletes a document'],
        correctAnswer: 'Returns a single document',
        category: 'mongodb',
        difficulty: 'basic'
      },
      {
        question: 'What is BSON in MongoDB?',
        options: ['Binary JSON', 'A query language', 'A styling format', 'A server protocol'],
        correctAnswer: 'Binary JSON',
        category: 'mongodb',
        difficulty: 'basic'
      },
      {
        question: 'How do you delete a collection in MongoDB?',
        options: ['Using db.collection.drop()', 'Using db.collection.delete()', 'Using db.collection.remove()', 'Using db.collection.clear()'],
        correctAnswer: 'Using db.collection.drop()',
        category: 'mongodb',
        difficulty: 'basic'
      },
      {
        question: 'What is a MongoDB database?',
        options: ['A container for collections', 'A single document', 'A query', 'A server'],
        correctAnswer: 'A container for collections',
        category: 'mongodb',
        difficulty: 'basic'
      }
    ],
    intermediate: [
      {
        question: 'How do you query documents in MongoDB?',
        options: ['Using db.collection.find()', 'Using db.collection.search()', 'Using db.collection.get()', 'Using db.collection.query()'],
        correctAnswer: 'Using db.collection.find()',
        category: 'mongodb',
        difficulty: 'intermediate'
      },
      {
        question: 'What is an index in MongoDB?',
        options: ['A data structure to improve query performance', 'A type of document', 'A collection of queries', 'A database backup'],
        correctAnswer: 'A data structure to improve query performance',
        category: 'mongodb',
        difficulty: 'intermediate'
      },
      {
        question: 'How do you update a document in MongoDB?',
        options: ['Using db.collection.updateOne()', 'Using db.collection.modify()', 'Using db.collection.change()', 'Using db.collection.edit()'],
        correctAnswer: 'Using db.collection.updateOne()',
        category: 'mongodb',
        difficulty: 'intermediate'
      },
      {
        question: 'What is the purpose of the $set operator in MongoDB?',
        options: ['To update specific fields in a document', 'To delete a document', 'To create a new collection', 'To sort query results'],
        correctAnswer: 'To update specific fields in a document',
        category: 'mongodb',
        difficulty: 'intermediate'
      },
      {
        question: 'How do you delete a document in MongoDB?',
        options: ['Using db.collection.deleteOne()', 'Using db.collection.removeDoc()', 'Using db.collection.erase()', 'Using db.collection.drop()'],
        correctAnswer: 'Using db.collection.deleteOne()',
        category: 'mongodb',
        difficulty: 'intermediate'
      },
      {
        question: 'What does the $in operator do in MongoDB?',
        options: ['Matches values in an array', 'Updates documents', 'Sorts results', 'Groups documents'],
        correctAnswer: 'Matches values in an array',
        category: 'mongodb',
        difficulty: 'intermediate'
      },
      {
        question: 'How do you sort query results in MongoDB?',
        options: ['Using .sort()', 'Using .order()', 'Using .arrange()', 'Using .group()'],
        correctAnswer: 'Using .sort()',
        category: 'mongodb',
        difficulty: 'intermediate'
      },
      {
        question: 'What is the purpose of db.collection.countDocuments()?',
        options: ['Counts matching documents', 'Updates documents', 'Deletes documents', 'Creates collections'],
        correctAnswer: 'Counts matching documents',
        category: 'mongodb',
        difficulty: 'intermediate'
      },
      {
        question: 'How do you limit the number of results in MongoDB?',
        options: ['Using .limit()', 'Using .restrict()', 'Using .cap()', 'Using .truncate()'],
        correctAnswer: 'Using .limit()',
        category: 'mongodb',
        difficulty: 'intermediate'
      },
      {
        question: 'What does the $or operator do in MongoDB?',
        options: ['Matches documents meeting any condition', 'Updates documents', 'Sorts results', 'Groups documents'],
        correctAnswer: 'Matches documents meeting any condition',
        category: 'mongodb',
        difficulty: 'intermediate'
      }
    ],
    hard: [
      {
        question: 'What is sharding in MongoDB?',
        options: ['Distributing data across multiple servers', 'Encrypting data', 'Creating indexes', 'Backing up data'],
        correctAnswer: 'Distributing data across multiple servers',
        category: 'mongodb',
        difficulty: 'hard'
      },
      {
        question: 'What is the aggregation pipeline in MongoDB?',
        options: ['A framework for data processing and transformation', 'A method for creating collections', 'A backup tool', 'A query optimizer'],
        correctAnswer: 'A framework for data processing and transformation',
        category: 'mongodb',
        difficulty: 'hard'
      },
      {
        question: 'How do you implement transactions in MongoDB?',
        options: ['Using sessions with startSession()', 'Using db.transaction()', 'Using db.commit()', 'Using db.rollback()'],
        correctAnswer: 'Using sessions with startSession()',
        category: 'mongodb',
        difficulty: 'hard'
      },
      {
        question: 'What is the purpose of the $lookup operator in MongoDB?',
        options: ['To perform a left join between collections', 'To sort documents', 'To update documents', 'To create indexes'],
        correctAnswer: 'To perform a left join between collections',
        category: 'mongodb',
        difficulty: 'hard'
      },
      {
        question: 'What is a replica set in MongoDB?',
        options: ['A group of servers maintaining the same data for redundancy', 'A single database instance', 'A collection of indexes', 'A query execution plan'],
        correctAnswer: 'A group of servers maintaining the same data for redundancy',
        category: 'mongodb',
        difficulty: 'hard'
      },
      {
        question: 'What does the $group operator do in the aggregation pipeline?',
        options: ['Groups documents by a field and performs calculations', 'Sorts documents', 'Updates documents', 'Joins collections'],
        correctAnswer: 'Groups documents by a field and performs calculations',
        category: 'mongodb',
        difficulty: 'hard'
      },
      {
        question: 'How do you create a compound index in MongoDB?',
        options: ['Using createIndex() with multiple fields', 'Using compoundIndex()', 'Using multiIndex()', 'Using indexCompound()'],
        correctAnswer: 'Using createIndex() with multiple fields',
        category: 'mongodb',
        difficulty: 'hard'
      },
      {
        question: 'What is the purpose of the $match operator in MongoDB?',
        options: ['Filters documents in the aggregation pipeline', 'Groups documents', 'Sorts documents', 'Joins collections'],
        correctAnswer: 'Filters documents in the aggregation pipeline',
        category: 'mongodb',
        difficulty: 'hard'
      },
      {
        question: 'How do you handle write conflicts in MongoDB transactions?',
        options: ['Using retry logic with try-catch', 'Using db.retry()', 'Using db.conflict()', 'Using res.retry()'],
        correctAnswer: 'Using retry logic with try-catch',
        category: 'mongodb',
        difficulty: 'hard'
      },
      {
        question: 'What is the capped collection in MongoDB?',
        options: ['A fixed-size collection with automatic overwrite', 'A temporary collection', 'A sorted collection', 'A secure collection'],
        correctAnswer: 'A fixed-size collection with automatic overwrite',
        category: 'mongodb',
        difficulty: 'hard'
      }
    ]
  },
  nodejs: {
    basic: [
      {
        question: 'What is Node.js?',
        options: ['A JavaScript runtime built on Chrome’s V8 engine', 'A front-end framework', 'A database system', 'A CSS preprocessor'],
        correctAnswer: 'A JavaScript runtime built on Chrome’s V8 engine',
        category: 'nodejs',
        difficulty: 'basic'
      },
      {
        question: 'What is the purpose of the require() function in Node.js?',
        options: ['To import modules', 'To export modules', 'To create HTTP servers', 'To manage databases'],
        correctAnswer: 'To import modules',
        category: 'nodejs',
        difficulty: 'basic'
      },
      {
        question: 'How do you create an HTTP server in Node.js?',
        options: ['Using http.createServer()', 'Using server.start()', 'Using http.run()', 'Using app.listen()'],
        correctAnswer: 'Using http.createServer()',
        category: 'nodejs',
        difficulty: 'basic'
      },
      {
        question: 'What is the Node.js event loop?',
        options: ['A mechanism for handling asynchronous operations', 'A database query system', 'A routing mechanism', 'A styling engine'],
        correctAnswer: 'A mechanism for handling asynchronous operations',
        category: 'nodejs',
        difficulty: 'basic'
      },
      {
        question: 'What does npm stand for?',
        options: ['Node Package Manager', 'Node Process Manager', 'Node Project Module', 'Node Programming Model'],
        correctAnswer: 'Node Package Manager',
        category: 'nodejs',
        difficulty: 'basic'
      },
      {
        question: 'How do you export a module in Node.js?',
        options: ['Using module.exports', 'Using export.module', 'Using require.exports', 'Using app.export()'],
        correctAnswer: 'Using module.exports',
        category: 'nodejs',
        difficulty: 'basic'
      },
      {
        question: 'What is the purpose of the console.log() function in Node.js?',
        options: ['Prints output to the console', 'Sends HTTP responses', 'Parses JSON', 'Handles events'],
        correctAnswer: 'Prints output to the console',
        category: 'nodejs',
        difficulty: 'basic'
      },
      {
        question: 'What is the global object in Node.js?',
        options: ['An object available in all modules', 'A database connector', 'A styling object', 'A routing object'],
        correctAnswer: 'An object available in all modules',
        category: 'nodejs',
        difficulty: 'basic'
      },
      {
        question: 'How do you read a file in Node.js?',
        options: ['Using fs.readFile()', 'Using file.read()', 'Using read.file()', 'Using app.readFile()'],
        correctAnswer: 'Using fs.readFile()',
        category: 'nodejs',
        difficulty: 'basic'
      },
      {
        question: 'What is the purpose of process.env in Node.js?',
        options: ['To access environment variables', 'To handle HTTP requests', 'To manage modules', 'To style applications'],
        correctAnswer: 'To access environment variables',
        category: 'nodejs',
        difficulty: 'basic'
      }
    ],
    intermediate: [
      {
        question: 'What is a callback function in Node.js?',
        options: ['A function passed as an argument to another function', 'A function that creates modules', 'A function that handles routing', 'A function that manages state'],
        correctAnswer: 'A function passed as an argument to another function',
        category: 'nodejs',
        difficulty: 'intermediate'
      },
      {
        question: 'How do you handle asynchronous operations in Node.js?',
        options: ['Using Promises or async/await', 'Using synchronous functions', 'Using inline functions', 'Using global variables'],
        correctAnswer: 'Using Promises or async/await',
        category: 'nodejs',
        difficulty: 'intermediate'
      },
      {
        question: 'What is the purpose of the fs module in Node.js?',
        options: ['To interact with the file system', 'To create HTTP servers', 'To manage databases', 'To handle routing'],
        correctAnswer: 'To interact with the file system',
        category: 'nodejs',
        difficulty: 'intermediate'
      },
      {
        question: 'What is the Buffer class in Node.js used for?',
        options: ['To handle binary data', 'To manage HTTP requests', 'To create modules', 'To style applications'],
        correctAnswer: 'To handle binary data',
        category: 'nodejs',
        difficulty: 'intermediate'
      },
      {
        question: 'How do you create a custom module in Node.js?',
        options: ['Using module.exports', 'Using exports.create()', 'Using module.create()', 'Using require.module()'],
        correctAnswer: 'Using module.exports',
        category: 'nodejs',
        difficulty: 'intermediate'
      },
      {
        question: 'What is the purpose of the path module in Node.js?',
        options: ['To handle file paths', 'To manage HTTP requests', 'To parse JSON', 'To handle events'],
        correctAnswer: 'To handle file paths',
        category: 'nodejs',
        difficulty: 'intermediate'
      },
      {
        question: 'How do you handle errors in asynchronous Node.js code?',
        options: ['Using try-catch with async/await', 'Using synchronous try-catch', 'Using res.error()', 'Using app.error()'],
        correctAnswer: 'Using try-catch with async/await',
        category: 'nodejs',
        difficulty: 'intermediate'
      },
      {
        question: 'What is the role of the os module in Node.js?',
        options: ['Provides operating system information', 'Handles HTTP requests', 'Parses JSON', 'Manages modules'],
        correctAnswer: 'Provides operating system information',
        category: 'nodejs',
        difficulty: 'intermediate'
      },
      {
        question: 'How do you create a Promise in Node.js?',
        options: ['Using new Promise()', 'Using Promise.create()', 'Using async.create()', 'Using promise.new()'],
        correctAnswer: 'Using new Promise()',
        category: 'nodejs',
        difficulty: 'intermediate'
      },
      {
        question: 'What is the purpose of the util module in Node.js?',
        options: ['Provides utility functions', 'Handles HTTP requests', 'Manages files', 'Styles applications'],
        correctAnswer: 'Provides utility functions',
        category: 'nodejs',
        difficulty: 'intermediate'
      }
    ],
    hard: [
      {
        question: 'What is the purpose of the cluster module in Node.js?',
        options: ['To utilize multiple CPU cores for better performance', 'To manage database connections', 'To handle HTTP requests', 'To create animations'],
        correctAnswer: 'To utilize multiple CPU cores for better performance',
        category: 'nodejs',
        difficulty: 'hard'
      },
      {
        question: 'How do you implement streaming in Node.js?',
        options: ['Using streams with the stream module', 'Using res.stream()', 'Using app.stream()', 'Using req.stream()'],
        correctAnswer: 'Using streams with the stream module',
        category: 'nodejs',
        difficulty: 'hard'
      },
      {
        question: 'What is the child_process module used for in Node.js?',
        options: ['To execute external processes', 'To manage HTTP servers', 'To handle file operations', 'To create modules'],
        correctAnswer: 'To execute external processes',
        category: 'nodejs',
        difficulty: 'hard'
      },
      {
        question: 'How do you secure a Node.js application?',
        options: ['Using helmet, input validation, and HTTPS', 'Using inline styles', 'Using global variables', 'Using synchronous functions'],
        correctAnswer: 'Using helmet, input validation, and HTTPS',
        category: 'nodejs',
        difficulty: 'hard'
      },
      {
        question: 'What is the purpose of the EventEmitter class in Node.js?',
        options: ['To handle custom events and listeners', 'To manage database queries', 'To create HTTP servers', 'To handle file operations'],
        correctAnswer: 'To handle custom events and listeners',
        category: 'nodejs',
        difficulty: 'hard'
      },
      {
        question: 'What is a Transform stream in Node.js?',
        options: ['A stream that modifies data', 'A stream that reads data', 'A stream that writes data', 'A stream that closes connections'],
        correctAnswer: 'A stream that modifies data',
        category: 'nodejs',
        difficulty: 'hard'
      },
      {
        question: 'How do you implement a worker thread in Node.js?',
        options: ['Using the worker_threads module', 'Using thread.create()', 'Using app.worker()', 'Using res.thread()'],
        correctAnswer: 'Using the worker_threads module',
        category: 'nodejs',
        difficulty: 'hard'
      },
      {
        question: 'What is the purpose of the dns module in Node.js?',
        options: ['To perform DNS lookups', 'To handle HTTP requests', 'To manage files', 'To parse JSON'],
        correctAnswer: 'To perform DNS lookups',
        category: 'nodejs',
        difficulty: 'hard'
      },
      {
        question: 'How do you handle uncaught exceptions in Node.js?',
        options: ['Using process.on("uncaughtException")', 'Using try-catch globally', 'Using app.error()', 'Using res.error()'],
        correctAnswer: 'Using process.on("uncaughtException")',
        category: 'nodejs',
        difficulty: 'hard'
      },
      {
        question: 'What is the purpose of the crypto module in Node.js?',
        options: ['To handle cryptographic operations', 'To manage HTTP requests', 'To parse JSON', 'To handle files'],
        correctAnswer: 'To handle cryptographic operations',
        category: 'nodejs',
        difficulty: 'hard'
      }
    ]
  }
};


const seedDB = async () => {
  try {
    await Question.deleteMany({});
    console.log('Cleared existing questions');

    const allQuestions = [];
    for (const quizType of Object.keys(questions)) {
      for (const difficulty of Object.keys(questions[quizType])) {
        // Randomize options for each question
        const randomizedQuestions = questions[quizType][difficulty].map((question) => {
          const shuffledOptions = shuffleArray([...question.options]);
          return {
            ...question,
            options: shuffledOptions,
            correctAnswer: shuffledOptions.indexOf(question.correctAnswer), // Store index of correct answer
          };
        });
        allQuestions.push(...randomizedQuestions);
      }
    }

    await Question.insertMany(allQuestions);
    console.log(`Inserted ${allQuestions.length} questions`);

    console.log('Database seeding complete');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding database:', err);
    mongoose.connection.close();
  }
};

seedDB();