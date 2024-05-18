import { Button } from '@/components/ui/button';
import { Sheet, SheetTitle, SheetDescription , SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet';

import { TiThMenu } from "react-icons/ti";

export const MobileNav = () => {
    return <Sheet>
        <SheetTrigger>
            <Button><TiThMenu /></Button>
        </SheetTrigger>
        <SheetContent>
        <SheetHeader>
        <SheetTitle>Are you absolutely sure?</SheetTitle>
        <SheetDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
        </SheetDescription>
        </SheetHeader>
    </SheetContent>
    </Sheet>
}