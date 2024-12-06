This is the code for the article "React 19 introduces full support of Web Components".

This monorepo repository uses npm workspaces and contains three packages:
- web-components, that has a `web-counter` component
- react-18, React app using the `web-counter` component with React 18.
- react-19, React app using the `web-counter` component with React 19.

## Ho to run
- First, you need to install all dependencies and link packages in the monorepo. To do this, call in the terminal `npm install`.
- To run React 18 app, call in the terminal `npm run dev -w=react-18`
- To run React 19 app, call in the terminal `npm run dev -w=react-19`
