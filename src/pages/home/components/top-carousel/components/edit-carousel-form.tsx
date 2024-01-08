import React, { useState, useEffect } from 'react';
import jsonData from '../../../../../constants/topCarousal.json';
import { Button, TextField } from '@mui/material';
import { HeroCard } from '../../../../../interfaces';

// interface FormData {
//     title: string;
//     description: string;
//     order: number;
// }

// interface EditCarousalDataProps {
//     selectedId: number;
//     onClose: () => void;
// }

// const EditCarousalData: React.FC<EditCarousalDataProps> = ({ selectedId, onClose }) => {
//     const initialFormData: FormData = {
//         title: '',
//         description: '',
//         order: 0,
//     };

//     const [formData, setFormData] = useState(initialFormData);

//     useEffect(() => {
//         const selectedData = jsonData.find((item: HeroCard) => item.id === selectedId);

//         if (selectedData) {
//             setFormData({
//                 title: selectedData.title,
//                 description: selectedData.description,
//                 order: selectedData.order,
//             });
//         }
//     }, [selectedId]);

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();

//         const updatedData = jsonData.map((item: HeroCard) =>
//             item.id === selectedId ? { ...item, ...formData } : item
//         );

//         console.log(updatedData);

//         setFormData(initialFormData);

//         onClose();
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <h2 style={{ marginTop: 0 }}>Edit Item</h2>
//             <TextField
//                 sx={{ width: '100%', marginBottom: 3 }}
//                 id="outlined-basic"
//                 label="Title"
//                 variant="outlined"
//                 value={formData.title}
//                 onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//             />
//             <TextField
//                 sx={{ width: '100%', marginBottom: 3 }}
//                 id="outlined-basic"
//                 label="Description"
//                 variant="outlined"
//                 value={formData.description}
//                 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//             />
//             <TextField
//                 sx={{ width: '100%', marginBottom: 3 }}
//                 id="outlined-basic"
//                 label="Order"
//                 variant="outlined"
//                 value={formData.order.toString()}
//                 onChange={(e) => setFormData({ ...formData, order: +e.target.value })}
//             />
//             <Button variant="contained" type="submit" color="primary">
//                 Update Data
//             </Button>
//         </form>
//     );
// };

// export default EditCarousalData;
export { }
