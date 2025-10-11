import { Button } from "@radix-ui/themes"


const DeleteIssueButton = ({ issueId }: {issueId: number}) => {
  return (
    <div>
      <Button color="red">Delete Issue</Button>
    </div>
  )
}

export default DeleteIssueButton
