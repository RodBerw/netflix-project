'use client'

import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { useState } from "react";

export default function Select(){
    const [isHover, setIsHover] = useState(false);

    return(
        <div className="p-2" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
            <Dropdown isOpen={isHover} className="bg-black rounded-none">
            <DropdownTrigger>
            <Button className="text-white" variant="light">Menu</Button>
            </DropdownTrigger>
            <DropdownMenu variant="light" className="bg-black">
                <DropdownItem variant="light" className="!bg-black !text-gray-400 hover:!text-white" key="new">New</DropdownItem>
                <DropdownItem variant="light" className="!bg-black !text-gray-400 hover:!text-white" key="edit">Edit</DropdownItem>
            </DropdownMenu>
        </Dropdown>
      </div>
    );
}