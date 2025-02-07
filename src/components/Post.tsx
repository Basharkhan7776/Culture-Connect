import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Star, MapPin, Clock, Calendar } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";

interface ReadMoreProps {
    text: string;
    maxLength: number;
}


interface PostProps {
    postId:string;
    title: string;
    description: string;
    image?: string;
    date: string;
    stars: number;
    tags?: string[];
    address: string;
    time: string;
    userId:string;
    handleLike:(postId: string, isLiked: boolean) => void;
    isLiked:boolean
}



export function Post({ title, description, image, date, userId, stars, tags = [], address, time, handleLike, postId, isLiked }: PostProps) {




    return (
        <Card className="w-auto no-scrollbar mb-4 flex flex-col justify-between font-poppins hover:shadow-md hover:shadow-orange-500 transition-all duration-200 text-white/80 overflow-scroll">
            <div className="flex flex-col gap-2">
                <CardHeader className="gap-2">
                    <CardTitle className="text-xl dark:text-white">{title}</CardTitle>
                    <CardDescription className="text-wrap"> <ReadMore text={description} maxLength={40} /></CardDescription>
                    <div className="flex gap-1">{tags.map((x) => {
                        return <Tag tag={x} />
                    })}</div>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 bg-cover bg-center">
                    {image && <img src={image} alt="imgs" className=" rounded-sm"></img>}
                    <div className="flex gap-3 items-center"><MapPin className="h-8 w-8" /> <p>{address}</p></div>
                    <div className="flex gap-4 items-center">
                        <div className="flex items-center gap-2">
                            <Clock className="h-8 aspect-square" />
                            <p>{time}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="h-8 aspect-square" />
                            <p>{date}</p>
                        </div>
                    </div>
                </CardContent >
            </div>
            <CardFooter className="flex gap-2 justify-between">
                <div className="flex items-center gap-2 font-semibold">
                    <img src='' alt="profile" className="h-6 aspect-square rounded-full" />
                    <p className="text-lg">{}</p>
                </div>
                <Button 
                variant={"secondary"} 
                onClick={() => handleLike(postId!, isLiked)}
                >
                    <Star fill={isLiked ? "orange" : "none"} />
                    {stars}
                </Button>
            </CardFooter>
        </Card>
    )
}

function Tag({ tag }: { tag: string }) {
    return (
        <div className="px-[15px] py-[2px] bg-neutral-500/20 rounded-xl text-[12px] dark:text-white">
            #{tag}
        </div>
    )
}

const ReadMore: React.FC<ReadMoreProps> = ({ text, maxLength }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    if (text.length <= maxLength) {
        return <p className="text-wrap">{text}</p>
    } else {
        return (
            <p>
                {isExpanded ? text : `${text.slice(0, maxLength)}... `}
                <button
                    onClick={toggleReadMore}
                    className="text-orange-500 hover:underline font-medium"
                >
                    {isExpanded ? "Read Less" : "Read More"}
                </button>
            </p>
        );
    }
};

