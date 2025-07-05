import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Filter } from "lucide-react";

interface FilterOption {
  id: string;
  label: string;
  count?: number;
  premium?: boolean;
  active?: boolean;
}

interface CommunityFiltersProps {
  onFilterChange: (filterId: string) => void;
  activeFilter: string;
}

export const CommunityFilters = ({ onFilterChange, activeFilter }: CommunityFiltersProps) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const mainFilters: FilterOption[] = [
    { id: "all", label: "All", count: 142, active: true },
    { id: "infofi", label: "#InfoFi", count: 45 },
    { id: "airdrops", label: "#Airdrops", count: 32 },
    { id: "defi", label: "#DeFi", count: 28 },
    { id: "nfts", label: "#NFTs", count: 15 },
    { id: "gaming", label: "#Gaming", count: 22 }
  ];

  const advancedFilters: FilterOption[] = [
    { id: "hot", label: "🔥 Hot", premium: true },
    { id: "trending", label: "📈 Trending", premium: true },
    { id: "high-reward", label: "💎 High Reward", premium: true }
  ];

  return (
    <div className="space-y-4">
      {/* Main Filters */}
      <div className="flex items-center space-x-2 flex-wrap gap-2">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Filter className="w-4 h-4" />
          <span>Filter:</span>
        </div>
        
        {mainFilters.map((filter) => (
          <Button
            key={filter.id}
            variant={activeFilter === filter.id ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange(filter.id)}
            className="h-8"
          >
            {filter.label}
            {filter.count && (
              <Badge variant="secondary" className="ml-2 text-xs">
                {filter.count}
              </Badge>
            )}
          </Button>
        ))}

        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="h-8"
        >
          Advanced
          <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
        </Button>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="flex items-center space-x-2 flex-wrap gap-2 pl-6 border-l-2 border-primary/20">
          <span className="text-sm text-muted-foreground">Premium:</span>
          {advancedFilters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "secondary"}
              size="sm"
              onClick={() => onFilterChange(filter.id)}
              className="h-8 bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border-purple-500/30"
            >
              {filter.label}
              <Badge variant="outline" className="ml-2 text-xs border-purple-500/50">
                PRO
              </Badge>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};