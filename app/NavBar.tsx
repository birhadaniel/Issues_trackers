'use client';

import { Skeleton } from '@/app/components';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import {FaBug} from 'react-icons/fa'
import { useSession } from 'next-auth/react';
import { Avatar, Box, Button, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';

const Navbar = () => {

  return (
    <nav className='border-b mb-5 px-5 py-3'>
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <FaBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
}

const NavLinks = () =>{
   const currentPath = usePathname();
  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues/list'}
    
  ]
  return(
    <ul className=' flex space-x-6'>
      {links.map(link =>
        <li key={link.href} >
          <Link 
            className={classNames ({
            "nav-link": true,
            '!text-zinc-900': link.href === currentPath,
            })}
             href={link.href}>{link.label}
          </Link>
        </li>)}
    </ul>
  );
}

const AuthStatus = () =>{
   const { status, data: session } = useSession();

   if(status === "loading") return <Skeleton width="3rem"/>;

   if(status ==="unauthenticated")
    return <Link className='nav-link' href="/api/auth/signin">Login</Link>

  return(
    <Box>
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Avatar 
                src={session!.user?.image ?? undefined} 
                fallback="?"
                size="2"
                radius="full"
                className='cursor-pointer'
                referrerPolicy='no-referrer'
              />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Label>
                <Text size='2' weight="bold">
                  {session!.user!.name}
                </Text>
              </DropdownMenu.Label>
              <DropdownMenu.Label>
                <Text size="1" color='gray'>
                  {session!.user!.email}
                </Text>
              </DropdownMenu.Label>
              <DropdownMenu.Separator />
              <DropdownMenu.Item>
                  <Link href="/api/auth/signout">Logout</Link>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    </Box> 
  );
}
export default Navbar
