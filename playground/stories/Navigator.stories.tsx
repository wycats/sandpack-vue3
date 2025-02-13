import {
  Navigator,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
  SandpackThemeProvider,
} from 'codesandbox-sandpack-vue3';

export default {
  title: 'components/Navigator',
};

export const Component = () => (
  <SandpackProvider template="react">
    <SandpackThemeProvider>
      {/* @ts-ignore */}
      <Navigator />
    </SandpackThemeProvider>
  </SandpackProvider>
);

const routingSetup = {
  dependencies: {
    'react-router-dom': '5.3.0',
    'react-scripts': '4.0.3',
    react: '17.0.2',
    'react-dom': '17.0.2',
  },
  files: {
    '/index.html': {
      code: '<div id="root"></div>',
    },
    '/index.js': {
      code: `import ReactDOM from "react-dom";
import App from "./example";

ReactDOM.render(<App />, document.getElementById("root"));
        `,
    },
    '/example.js': {
      code: `import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function BasicExample() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>

        <hr />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

`,
    },
  },
};

export const WithRouting = () => (
  <SandpackProvider customSetup={routingSetup} template="react">
    <SandpackLayout>
      <SandpackPreview showNavigator />
    </SandpackLayout>
  </SandpackProvider>
);

export const WithStartingRoute = () => (
  <SandpackProvider
    customSetup={routingSetup}
    options={{
      startRoute: '/about',
    }}
    template="react"
  >
    <SandpackLayout>
      <SandpackPreview showNavigator />
    </SandpackLayout>
  </SandpackProvider>
);
