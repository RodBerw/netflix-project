'use client'

import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";

export default function About(){
    return (
        <Dropdown>
        <DropdownTrigger>
          <Button>Menu</Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem key="new">New</DropdownItem>
          <DropdownItem key="edit">Edit</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
}