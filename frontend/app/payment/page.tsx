'use client'
import React from 'react';
import ProgressBar from '@/components/payment/progressbar';
import Image from 'next/image';
import { addDays, format } from "date-fns"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowLeftSquare, CalendarIcon, CheckIcon, ChevronsUpDown } from 'lucide-react';
import { cn } from "@/lib/utils"
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Calendar } from "@/components/ui/calendar"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
// Payment method options
const frameworks = [
    {
        value: "payByCash",
        label: "Pay by cash on Meet",
    },
    {
        value: "online",
        label: "Pay Online",
    },
];

// Bank options for the "Select Bank / Account" popover
const banks = [
    {
        value: "bankA",
        label: "Bank A",
    },
    {
        value: "bankB",
        label: "Bank B",
    },
    {
        value: "bankC",
        label: "Bank C",
    },
];

const PaymentPage = () => {
    const currentStep = 1.8;

    // Set the default value for the payment method to "online"
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("online");

    // State for selecting the bank
    const [bankOpen, setBankOpen] = React.useState(false);
    const [bankValue, setBankValue] = React.useState("");
    const [date, setDate] = React.useState<Date>()
    const [enddate, setendDate] = React.useState<Date>()

    return (
        <><div className='absolute mt-[150px] ml-[48px]'>
        <ArrowLeft size={30}/>

        </div>
            <div className="min-h-screen flex flex-col items-center justify-center pt-[100px] w-full space-y-[32px] overflow-visible">
                <div className="flex items-center justify-center w-[1052px] h-[79px]">
                    <ProgressBar currentStep={currentStep} />
                </div>

                <div className='flex w-full px-[48px] space-x-[33px]'>
                <div className="w-[565px] h-[605px] bg-white" style={{ boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)', zIndex: 10 }}>
                        <div className='relative overflow-hidden px-[45px] pt-[45px] h-[267px]'>
                            <Image
                                src="https://picsum.photos/id/14/367/267"
                                alt="Interior Room"
                                width={474}
                                height={267}
                                className='h-full w-full object-cover rounded-[8px]'
                            />
                        </div>

                        <div className="mt-[18px] px-[45px] space-y-[28px] rounded-xl">
                            <div className="font-bold text-xl mb-2">Rent name - owner details</div>
                            <p className="text-gray-700 text-base">Room dimensions:</p>

                            <div className="flex flex-col">
                                <p className="text-gray-700 text-base">Renting dates:</p>
                                <div className='flex items-center justify-center'>
                                    <div className='mt-1 flex flex-col items-center justify-center'>
                                        <span>Move in:</span>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[215px] justify-start text-left font-normal",
                                                        !date && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
                                                <Select
                                                    onValueChange={(value) =>
                                                        setDate(addDays(new Date(), parseInt(value)))
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>
                                                    <SelectContent position="popper">
                                                        <SelectItem value="0">Today</SelectItem>
                                                        <SelectItem value="1">Tomorrow</SelectItem>
                                                        <SelectItem value="3">In 3 days</SelectItem>
                                                        <SelectItem value="7">In a week</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <div className="rounded-md border">
                                                    <Calendar mode="single" selected={date} onSelect={setDate} />
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    
                                </div>
                            </div>

                            <p className="text-gray-700 text-xl font-bold">
                                Rent: NRs 1,00,000 per month
                            </p>
                        </div>
                    </div>

                    <div className="w-[1211px] h-[605px] shadow-xl rounded-xl px-[69px] flex space-x-[114px] py-[51px]" style={{ boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)', zIndex: 10 }}>
                        <div className='w-[70%] space-y-[33px]'>

                            {/* Payment Method Popover */}
                            <div className='flex justify-between items-center'>
                                <Label className='text-xl'>Payment method:</Label>
                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={open}
                                            className="w-[369px] h-[58px] justify-between text-base"
                                        >
                                            {value
                                                ? frameworks.find((framework) => framework.value === value)?.label
                                                : "Select method..."}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[200px] p-0">
                                        <Command>
                                            <CommandList>
                                                <CommandEmpty>No framework found.</CommandEmpty>
                                                <CommandGroup>
                                                    {frameworks.map((framework) => (
                                                        <CommandItem
                                                            key={framework.value}
                                                            value={framework.value}
                                                            onSelect={(currentValue) => {
                                                                setValue(currentValue === value ? "" : currentValue);
                                                                setOpen(false);
                                                            }}
                                                        >
                                                            <CheckIcon
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    value === framework.value ? "opacity-100" : "opacity-0"
                                                                )}
                                                            />
                                                            {framework.label}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </div>

                            {/* Conditionally Render Bank/Account fields based on payment method */}
                            {value === 'online' && (
                                <>
                                    {/* Bank/Account Selection Popover */}
                                    <div className='flex justify-between items-center'>
                                        <Label className='text-xl'>Service</Label>
                                        <Popover open={bankOpen} onOpenChange={setBankOpen}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={bankOpen}
                                                    className="w-[369px] h-[58px] justify-between text-base"
                                                >
                                                    {bankValue
                                                        ? banks.find((bank) => bank.value === bankValue)?.label
                                                        : "Select wallet..."}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[200px] p-0">
                                                <Command>
                                                    <CommandList>
                                                        <CommandEmpty>No bank found.</CommandEmpty>
                                                        <CommandGroup>
                                                            {banks.map((bank) => (
                                                                <CommandItem
                                                                    key={bank.value}
                                                                    value={bank.value}
                                                                    onSelect={(currentValue) => {
                                                                        setBankValue(currentValue === bankValue ? "" : currentValue);
                                                                        setBankOpen(false);
                                                                    }}
                                                                >
                                                                    <CheckIcon
                                                                        className={cn(
                                                                            "mr-2 h-4 w-4",
                                                                            bankValue === bank.value ? "opacity-100" : "opacity-0"
                                                                        )}
                                                                    />
                                                                    {bank.label}
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                    </div>

                                    <div className='flex justify-between items-center'>
                                        <Label className='text-xl'>Account No.:</Label>
                                        <Input placeholder="e.g. 9840000000" type="text" className="w-[369px] h-[58px] border-gray-300 rounded-md text-base" />
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <Label className='text-xl'>Account Holder Name</Label>
                                        <Input placeholder="e.g. Inap Maharjan" type="text" className="w-[369px] h-[58px] border-gray-300 rounded-md text-base" />
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <Label className='text-xl'>Remarks</Label>
                                        <Input type="text" placeholder="e.g. ABCD" className="w-[369px] h-[58px] border-gray-300 rounded-md text-base" />
                                    </div>
                                </>
                            )}

                            {/* Amount field, always disabled and grayed out */}
                            <div className='flex justify-between items-center'>
                                <Label className='text-xl'>Amount (NRS)</Label>
                                <Input
                                    value="1,00,000 per month"
                                    type="text"
                                    className="w-[369px] h-[58px] border-gray-300 rounded-md bg-gray-200 text-gray-500 cursor-not-allowed text-base"
                                    disabled
                                />
                            </div>

                        </div>
                        <div className='w-[30%] flex items-end justify-end'>
                            <div className="flex items-center space-x-2">
                                <Label htmlFor="save-details " className='text-base'>Save account details</Label>
                                <Switch id="save-details" />
                            </div>
                        </div>
                    </div>

                </div>
                <div className='w-full px-[63px] flex justify-end'>
<Button variant="default" className="w-[150px] h-[50px] text-xl">Proceed</Button>
</div>
            </div>
        </>
    );
};

export default PaymentPage;
