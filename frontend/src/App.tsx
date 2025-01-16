import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// MUI components
import {
  Container,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  createItemItemsPostMutation,
  readItemsItemsGetOptions,
  // Make sure to import your generated DELETE mutation
  // The exact import name depends on your code generation.
  // E.g.:
  deleteItemItemsItemIdDeleteMutation,
} from "./client/@tanstack/react-query.gen.ts";
import { ItemOut } from "./client";

function App() {
  // 1) READ items
  const {
    data: items,
    error,
    isLoading,
    refetch,
  } = useQuery({
    ...readItemsItemsGetOptions(),
  });

  // 2) CREATE item
  const createItem = useMutation({
    ...createItemItemsPostMutation(),
    onError: (error) => {
      console.log("Error creating item:", error);
    },
    onSuccess: () => {
      console.log("Item created!");
    },
  });

  // 3) DELETE item
  const deleteItem = useMutation({
    ...deleteItemItemsItemIdDeleteMutation(),
    onError: (error) => {
      console.log("Error deleting item:", error);
    },
    onSuccess: () => {
      console.log("Item deleted!");
    },
  });

  // Local state for the form
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Handle form submit (CREATE)
  const handleSubmit = () => {
    createItem.mutate({ body: { name, description } });
    // Reset form fields
    setName("");
    setDescription("");
  };

  // Handle DELETE
  const handleDelete = (id: number) => {
    // Adjust based on your generator’s expected params signature:
    // e.g., mutate({ path: { itemId: id } }) or mutate({ params: { itemId: id }})
    deleteItem.mutate({ path: { item_id: id } });
  };

  useEffect(() => {
    refetch();
  }, [handleSubmit, handleDelete]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p>Loading items...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-red-500">Error loading items.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <Container maxWidth="md">
        <Paper className="p-6 mb-8">
          <Typography variant="h4" gutterBottom>
            FastAPI Items
          </Typography>

          {/* Form to create new items */}
          <Box className="flex flex-col gap-4">
            <TextField
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Description"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button variant="contained" onClick={handleSubmit}>
              Create Item
            </Button>
          </Box>
        </Paper>

        {/* Display items in a Table */}
        <Paper className="p-6">
          <Typography variant="h5" gutterBottom>
            Existing Items
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items?.map((item: ItemOut) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.description || "—"}</TableCell>
                  <TableCell>
                    <IconButton
                      color="error"
                      aria-label="delete"
                      onClick={() => handleDelete(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Container>
    </div>
  );
}

export default App;
