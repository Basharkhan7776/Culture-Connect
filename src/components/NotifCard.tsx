import { Calendar, Clock } from "lucide-react"
import { Card, CardContent, CardHeader } from "./ui/card"


interface Prop {
    title: string;
    date: string;
    time: string;
}


export default function NotifCard({title, date, time}:Prop) {
  return (
    <div className="font-poppins">
        <Card className="gap-4">
            <CardHeader className="text-xl">{title}</CardHeader>
            <CardContent className="flex gap-4">
                <div className="flex gap-2 items-center text-secondary-foreground">
                    <Clock/><p>{time}</p>
                </div>
                <div className="flex gap-2 items-center text-secondary-foreground">
                    <Calendar/><p>{date}</p>
                </div>
            </CardContent>
        </Card>
    </div>
  )
}1
