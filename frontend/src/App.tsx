import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Checkbox, Box, AppBar, Toolbar } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Save as SaveIcon, Add as AddIcon } from '@mui/icons-material';
import { getTodos, createTodo, updateTodo, deleteTodo } from './services/api';
import { Todo } from './types/todo';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const todos = await getTodos();
      setTodos(todos);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    
    try {
      const todo = await createTodo(newTodo);
      setTodos([todo, ...todos]);
      setNewTodo('');
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  const handleToggleComplete = async (todo: Todo) => {
    try {
      const updatedTodo = await updateTodo(todo.id, { completed: !todo.completed });
      setTodos(todos.map(t => (t.id === todo.id ? updatedTodo : t)));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.title);
  };

  const handleEditSubmit = async (id: number) => {
    if (!editText.trim()) return;
    
    try {
      const updatedTodo = await updateTodo(id, { title: editText });
      setTodos(todos.map(t => (t.id === id ? updatedTodo : t)));
      setEditingId(null);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todo App
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Box component="form" onSubmit={handleAddTodo} sx={{ display: 'flex', gap: 1, mb: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Add a new todo..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" startIcon={<AddIcon />}>
            Add
          </Button>
        </Box>

        <List>
          {todos.map((todo) => (
            <ListItem
              key={todo.id}
              sx={{
                bgcolor: 'background.paper',
                mb: 1,
                borderRadius: 1,
                boxShadow: 1,
              }}
            >
              <Checkbox
                checked={todo.completed}
                onChange={() => handleToggleComplete(todo)}
              />
              
              {editingId === todo.id ? (
                <Box sx={{ display: 'flex', flexGrow: 1, gap: 1 }}>
                  <TextField
                    fullWidth
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    size="small"
                  />
                  <Button
                    onClick={() => handleEditSubmit(todo.id)}
                    color="primary"
                    startIcon={<SaveIcon />}
                  >
                    Save
                  </Button>
                </Box>
              ) : (
                <ListItemText
                  primary={todo.title}
                  sx={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? 'text.secondary' : 'text.primary',
                  }}
                />
              )}
              
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  onClick={() => startEditing(todo)}
                  disabled={todo.completed}
                  sx={{ mr: 1 }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  onClick={() => handleDeleteTodo(todo.id)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        
        {todos.length === 0 && (
          <Typography variant="body1" color="text.secondary" textAlign="center" mt={4}>
            No todos yet. Add one above!
          </Typography>
        )}
      </Container>
    </div>
  );
}

export default App;
