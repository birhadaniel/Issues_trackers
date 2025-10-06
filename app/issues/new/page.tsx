'use client';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Button, TextArea, TextField } from '@radix-ui/themes';
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";


interface IssueForm {
  title: string;
  description: string;
}

const NewIssue = () => {
  const router = useRouter();
  const {register, control, handleSubmit} = useForm<IssueForm>();

  return (
    <form 
      className='max-w-xl space-y-3 pl-3' 
      onSubmit={handleSubmit(async(data) => {
        await axios.post('/api/issues', data);
        router.push('/issues');
      })}>
      <TextField.Root placeholder='Title' {...register('title')}/>
      <Controller
        name= "description"
        control={control}
        render={({field})=>  <SimpleMDE placeholder='Description'  {...field} />}
       />
      <Button>Submit New Issue</Button>
    </form>
  );
};

export default NewIssue;
