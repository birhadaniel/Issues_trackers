import React from 'react';
import { Button, Table } from '@radix-ui/themes';
import Link from 'next/link';
import { prisma } from '@/prisma/client';
import IssueStatusBadge from '../components/IssueStatusBadge';
import delay from 'delay'
import IssueActions from './issueActions';

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany()
  await delay(2000);
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
                {issue.title}
                <div className='block md:hidden'>
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
