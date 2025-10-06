'use client';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Button, Callout, Spinner, Text, TextArea, TextField } from '@radix-ui/themes';
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from "@/lib/validation";
import { z } from 'zod';
import ErrorMessage from "@/app/components/ErrorMessage";


type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssue = () => {
  const router = useRouter();
  const {register, control, handleSubmit, formState: {errors}} = useForm<IssueForm>({
    resolver:zodResolver(createIssueSchema)
  });
  const [error, setError ] = useState('');
  const [isSubmitting, setSubmitting ] = useState(false);
  const onSubmit = handleSubmit(async(data) => {
    try {
      setSubmitting(true);
      await axios.post('/api/issues', data);
      router.push('/issues');
    } catch (error) {
      setSubmitting(false);
      setError('An unexpected error occurred.')
    }
  })

  return (
    <div className='max-w-xl pl-3 space-y-3'>
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form 
        className='space-y-3' 
        onSubmit={onSubmit}>
        <TextField.Root placeholder='Title' {...register('title')}/>
          <ErrorMessage>
            {errors.title?.message}
          </ErrorMessage>
        <Controller
          name= "description"
          control={control}
          render={({field})=>  <SimpleMDE placeholder='Description'  {...field} />}
        />
         <ErrorMessage>
            {errors.description?.message}
          </ErrorMessage>
        <Button disabled={isSubmitting}>Submit New Issue { isSubmitting && <Spinner/>}</Button>
      </form>
    </div>
  );
};

export default NewIssue;
