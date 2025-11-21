import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function InvestmentCard({
  code,
  name,
  type,
  description,
  image,
  status,
  qualified,
  details,
}) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge variant="secondary" className="bg-background/90 text-foreground">
              {status}
            </Badge>
            <Badge
              variant={qualified ? "default" : "secondary"}
              className={qualified ? "bg-primary text-primary-foreground" : "bg-background/90 text-foreground"}
            >
              {qualified ? "Qualified" : "Not qualified"}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg font-bold text-foreground">{code}</span>
              <Badge variant="outline" className="text-xs">
                {type}
              </Badge>
            </div>
            <h3 className="text-sm font-medium text-foreground">{name}</h3>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {description}
        </p>

        <div className="space-y-2">
          {details.map((detail, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span className="text-primary font-medium">{detail.label}</span>
              <span className="text-foreground">{detail.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}