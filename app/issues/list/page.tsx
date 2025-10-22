import React from 'react';
import { Table } from '@radix-ui/themes';
import { IssueStatusBadge, Link  } from '@/app/components';
import { prisma } from '@/prisma/client';
import IssueActions from './IssueActions';
import { Status } from '@prisma/client';

interface Props {
  searchParams: { status: Status }
}

const IssuesPage = async ({ searchParams, }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const issues = await prisma.issue.findMany({
    where: {
      status
    }
  });
  return (
    <div className='pl-5'>
      <IssueActions />
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell >Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell >Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>
                  {issue.title}
                </Link>
                <div className='hidden md:hidden'>
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell >
               <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell >{issue.createdAt.toDateString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}

export default IssuesPage
