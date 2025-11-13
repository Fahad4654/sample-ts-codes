import React from 'react';
import { Admin, Resource, ListGuesser, EditGuesser, CreateGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { TextField, Datagrid, EditButton, DeleteButton, SimpleForm, TextInput } from 'react-admin';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

const PostList = () => (
    <ListGuesser>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="title" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </ListGuesser>
);

const PostEdit = () => (
    <EditGuesser>
         <SimpleForm>
            <TextInput source="title" />
            <TextInput source="body" multiline />
        </SimpleForm>
    </EditGuesser>
);

const PostCreate = () => (
    <CreateGuesser>
         <SimpleForm>
            <TextInput source="title" />
            <TextInput source="body" multiline />
        </SimpleForm>
    </CreateGuesser>
);


const App = () => (
    <Admin dataProvider={dataProvider}>
        <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} />
    </Admin>
);

export default App;