module.exports = {
  templateFolder: 'templates',
  commands: {
    component: {
      scaffolds: [
        {
          template: 'component/index.ts.ejs',
          target: 'src/components/<%- casing.pascalCase(name) %>/index.ts'
        },
        {
          template: 'component/component.ts.ejs',
          target: 'src/components/<%- casing.pascalCase(name) %>/<%- casing.pascalCase(name) %>.tsx'
        }
      ],
      edits: [],
      variables: {
        name: {}
      }
    },
    redux: {
      scaffolds: [
        {
          template: 'redux/actions.ts.ejs',
          target: 'src/redux/<%- casing.camelCase(name) %>/actions.ts'
        },
        {
          template: 'redux/index.ts.ejs',
          target: 'src/redux/<%- casing.camelCase(name) %>/index.ts'
        },
        {
          template: 'redux/reducer.ts.ejs',
          target: 'src/redux/<%- casing.camelCase(name) %>/reducer.ts'
        },
        {
          template: 'redux/sagas.ts.ejs',
          target: 'src/redux/<%- casing.camelCase(name) %>/sagas.ts'
        },
        {
          template: 'redux/selectors.ts.ejs',
          target: 'src/redux/<%- casing.camelCase(name) %>/selectors.ts'
        },
        {
          template: 'redux/types.ts.ejs',
          target: 'src/redux/<%- casing.camelCase(name) %>/types.ts'
        }
      ],
      edits: [
        {
          target: 'src/redux/rootReducer.ts',
          mark: '// AUTOIMPORT REDUCER',
          template: 'redux/edit-import-reducer.ejs',
          editType: 'insertBefore'
        },
        {
          target: 'src/redux/rootReducer.ts',
          mark: '// AUTOREGISTER REDUCER',
          template: 'redux/edit-register-reducer.ejs',
          editType: 'insertAfter'
        },
        {
          target: 'src/redux/rootSaga.ts',
          mark: '// AUTOIMPORT SAGA',
          template: 'redux/edit-import-saga.ejs',
          editType: 'insertBefore'
        },
        {
          target: 'src/redux/rootSaga.ts',
          mark: '// AUTOREGISTER SAGA',
          template: 'redux/edit-register-saga.ejs',
          editType: 'insertAfter'
        }
      ],
      variables: {
        name: {}
      }
    }
  }
}
