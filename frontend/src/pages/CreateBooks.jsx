import {useState} from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import { useSnackbar } from 'notistack'

const CreateBooks = () => {
  const [loading, setLoading] = useState();
  const {register, handleSubmit} = useForm();
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();
  const onSubmit = (data) => {
    setLoading(true);

    axios
      .post('http://localhost:5000/books', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book was created successfully", {variant: 'success'});
        navigate('/');
      })
      .catch(err => {
        setLoading(false);
        enqueueSnackbar("Error", {variant: 'error'});

        console.log(err);
      })
  }
  return (
    <div className="p-4">
      <BackButton />
      <h1 className='text-3xl my-4'>Create Book</h1>
      {loading ? <Spinner /> : ''}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            className='border-2 border-gray-500 px-4 py-2 w-full'
            type="text"
            {...register("title")}
          />
        </div>
        <div className='my-4'>
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input 
            type="text"
            {...register("author")}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input 
            type="number"
            {...register("publishYear")}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button type='submit' className='p-2 bg-sky-300 m-8'>Create</button>
      </form>
    </div>
  )
}

export default CreateBooks