
const DeleteItemButton = ({ itemId, handleDelete }) => {
  const onDelete = async () => {
    try {
      await handleDelete(itemId);
      console.log('Item deleted:', itemId);
    } catch (error) {
      console.log('Error deleting item:', error);
    }
  };

  return (
    <button className="btn btn-danger" onClick={onDelete}>
      Delete
    </button>
  );
};

export default DeleteItemButton;
