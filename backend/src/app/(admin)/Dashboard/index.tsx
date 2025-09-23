import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	LineChart,
	Line,
	PieChart,
	Pie,
	Cell,
	Area,
	AreaChart,
	BarChart,
} from "recharts";
import {
	Plane,
	Gift,
	Bitcoin,
	TrendingUp,
	TrendingDown,
	DollarSign,
	MoreHorizontal,
	Calendar,
	Filter,
	Download,
	// MapPin,
	// Clock,
	// Eye,
} from "lucide-react";

// Mock data for charts
const flightBookingData = [
	{ month: "Jan", bookings: 245, revenue: 98000 },
	{ month: "Feb", bookings: 312, revenue: 125000 },
	{ month: "Mar", bookings: 189, revenue: 76000 },
	{ month: "Apr", bookings: 278, revenue: 111000 },
	{ month: "May", bookings: 356, revenue: 142000 },
	{ month: "Jun", bookings: 423, revenue: 169000 },
];

const giftCardData = [
	{ name: "Amazon", value: 35, color: "#059669" },
	{ name: "Apple", value: 25, color: "#10b981" },
	{ name: "Google Play", value: 20, color: "#34d399" },
	{ name: "Steam", value: 12, color: "#6ee7b7" },
	{ name: "Others", value: 8, color: "#a7f3d0" },
];

const cryptoData = [
	{ time: "00:00", btc: 42000, eth: 2800, volume: 1200000 },
	{ time: "04:00", btc: 42500, eth: 2850, volume: 1350000 },
	{ time: "08:00", btc: 41800, eth: 2780, volume: 1100000 },
	{ time: "12:00", btc: 43200, eth: 2920, volume: 1450000 },
	{ time: "16:00", btc: 43800, eth: 2980, volume: 1600000 },
	{ time: "20:00", btc: 44100, eth: 3020, volume: 1750000 },
];

const recentTransactions = [
	{
		id: "FL001",
		type: "Flight",
		customer: "John Doe",
		amount: "$1,250",
		status: "Confirmed",
		time: "2 min ago",
	},
	{
		id: "GC002",
		type: "Gift Card",
		customer: "Sarah Wilson",
		amount: "$500",
		status: "Processing",
		time: "5 min ago",
	},
	{
		id: "CR003",
		type: "Crypto",
		customer: "Mike Johnson",
		amount: "$2,100",
		status: "Completed",
		time: "8 min ago",
	},
	{
		id: "FL004",
		type: "Flight",
		customer: "Emma Brown",
		amount: "$890",
		status: "Pending",
		time: "12 min ago",
	},
	{
		id: "GC005",
		type: "Gift Card",
		customer: "David Lee",
		amount: "$250",
		status: "Completed",
		time: "15 min ago",
	},
];

const flightBookings = [
	{
		id: "FL001",
		passenger: "John Smith",
		route: "NYC → LAX",
		departure: "2024-01-15 08:30",
		arrival: "2024-01-15 11:45",
		status: "Confirmed",
		amount: "$450",
		airline: "American Airlines",
		class: "Economy",
	},
	{
		id: "FL002",
		passenger: "Sarah Johnson",
		route: "MIA → CHI",
		departure: "2024-01-15 14:20",
		arrival: "2024-01-15 17:10",
		status: "Pending",
		amount: "$320",
		airline: "United Airlines",
		class: "Business",
	},
	{
		id: "FL003",
		passenger: "Mike Wilson",
		route: "LAX → NYC",
		departure: "2024-01-16 06:15",
		arrival: "2024-01-16 14:30",
		status: "Confirmed",
		amount: "$520",
		airline: "Delta Airlines",
		class: "Economy",
	},
	{
		id: "FL004",
		passenger: "Emma Davis",
		route: "SEA → DEN",
		departure: "2024-01-16 10:45",
		arrival: "2024-01-16 13:20",
		status: "Cancelled",
		amount: "$280",
		airline: "Southwest Airlines",
		class: "Economy",
	},
	{
		id: "FL005",
		passenger: "David Brown",
		route: "BOS → SFO",
		departure: "2024-01-17 16:00",
		arrival: "2024-01-17 19:30",
		status: "Confirmed",
		amount: "$680",
		airline: "JetBlue Airways",
		class: "Premium",
	},
];

const flightStats = [
	{ route: "NYC → LAX", bookings: 145, revenue: 65250 },
	{ route: "MIA → CHI", bookings: 98, revenue: 31360 },
	{ route: "LAX → NYC", bookings: 132, revenue: 68640 },
	{ route: "SEA → DEN", bookings: 76, revenue: 21280 },
	{ route: "BOS → SFO", bookings: 89, revenue: 60520 },
];

const giftCardOrders = [
	{
		id: "GC001",
		customer: "Alice Cooper",
		brand: "Amazon",
		amount: "$100",
		status: "Processing",
		orderDate: "2024-01-15",
		email: "alice@email.com",
		code: "AMZ-****-****-1234",
	},
	{
		id: "GC002",
		customer: "Bob Martinez",
		brand: "Apple Store",
		amount: "$250",
		status: "Completed",
		orderDate: "2024-01-15",
		email: "bob@email.com",
		code: "APP-****-****-5678",
	},
	{
		id: "GC003",
		customer: "Carol White",
		brand: "Google Play",
		amount: "$50",
		status: "Pending",
		orderDate: "2024-01-14",
		email: "carol@email.com",
		code: "GPY-****-****-9012",
	},
	{
		id: "GC004",
		customer: "Daniel Lee",
		brand: "Steam",
		amount: "$75",
		status: "Completed",
		orderDate: "2024-01-14",
		email: "daniel@email.com",
		code: "STM-****-****-3456",
	},
	{
		id: "GC005",
		customer: "Eva Garcia",
		brand: "Netflix",
		amount: "$30",
		status: "Failed",
		orderDate: "2024-01-13",
		email: "eva@email.com",
		code: "NFX-****-****-7890",
	},
];

const giftCardStats = [
	{ brand: "Amazon", orders: 245, revenue: 24500, avgOrder: 100 },
	{ brand: "Apple Store", orders: 156, revenue: 39000, avgOrder: 250 },
	{ brand: "Google Play", orders: 189, revenue: 9450, avgOrder: 50 },
	{ brand: "Steam", orders: 98, revenue: 7350, avgOrder: 75 },
	{ brand: "Netflix", orders: 134, revenue: 4020, avgOrder: 30 },
];

const cryptoOrders = [
	{
		id: "CR001",
		user: "trader_mike",
		type: "Buy",
		crypto: "BTC",
		amount: "0.5",
		price: "$43,200",
		total: "$21,600",
		status: "Completed",
		timestamp: "2024-01-15 14:32:15",
	},
	{
		id: "CR002",
		user: "crypto_sarah",
		type: "Sell",
		crypto: "ETH",
		amount: "5.2",
		price: "$3,020",
		total: "$15,704",
		status: "Processing",
		timestamp: "2024-01-15 14:28:42",
	},
	{
		id: "CR003",
		user: "btc_holder",
		type: "Buy",
		crypto: "BTC",
		amount: "0.25",
		price: "$43,150",
		total: "$10,787.50",
		status: "Completed",
		timestamp: "2024-01-15 14:15:33",
	},
	{
		id: "CR004",
		user: "eth_trader",
		type: "Sell",
		crypto: "ETH",
		amount: "2.8",
		price: "$3,015",
		total: "$8,442",
		status: "Failed",
		timestamp: "2024-01-15 14:02:18",
	},
	{
		id: "CR005",
		user: "day_trader",
		type: "Buy",
		crypto: "BTC",
		amount: "1.2",
		price: "$43,180",
		total: "$51,816",
		status: "Pending",
		timestamp: "2024-01-15 13:45:27",
	},
];

const cryptoStats = [
	{ pair: "BTC/USD", volume: 1250000, trades: 342, avgPrice: 43200 },
	{ pair: "ETH/USD", volume: 890000, trades: 278, avgPrice: 3020 },
	{ pair: "ADA/USD", volume: 156000, trades: 89, avgPrice: 0.52 },
	{ pair: "SOL/USD", volume: 234000, trades: 156, avgPrice: 98.5 },
];

function AdminDashboardPage() {
	return (
		<>
			<div className="flex flex-col gap-8">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						Welcome back, John
					</h1>
					<p className="text-muted-foreground">
						Here's what you can do on your dashboard today.
					</p>
				</div>
			</div>
			<div className="min-h-screen bg-background w-full">
				<div className="container mx-auto p-6 space-y-8">
					{/* Overview Cards */}
					<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									Total Revenue
								</CardTitle>
								<DollarSign className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">
									$721,000
								</div>
								<p className="text-xs text-muted-foreground">
									<span className="text-primary flex items-center gap-1">
										<TrendingUp className="h-3 w-3" />
										+12.5%
									</span>
									from last month
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									Flight Bookings
								</CardTitle>
								<Plane className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">1,803</div>
								<p className="text-xs text-muted-foreground">
									<span className="text-primary flex items-center gap-1">
										<TrendingUp className="h-3 w-3" />
										+8.2%
									</span>
									from last month
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									Gift Card Orders
								</CardTitle>
								<Gift className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">892</div>
								<p className="text-xs text-muted-foreground">
									<span className="text-destructive flex items-center gap-1">
										<TrendingDown className="h-3 w-3" />
										-2.1%
									</span>
									from last month
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									Crypto Volume
								</CardTitle>
								<Bitcoin className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">$8.2M</div>
								<p className="text-xs text-muted-foreground">
									<span className="text-primary flex items-center gap-1">
										<TrendingUp className="h-3 w-3" />
										+24.7%
									</span>
									from last month
								</p>
							</CardContent>
						</Card>
					</div>

					{/* Main Dashboard Content */}
					<Tabs defaultValue="overview" className="space-y-6 w-full!">
						<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
							<TabsList className="grid w-full grid-cols-4 sm:max-w-md">
								<TabsTrigger value="overview">
									Overview
								</TabsTrigger>
								<TabsTrigger value="flights">
									Flights
								</TabsTrigger>
								<TabsTrigger value="giftcards">
									Gift Cards
								</TabsTrigger>
								<TabsTrigger value="crypto">Crypto</TabsTrigger>
							</TabsList>

							<div className="hidden sm:flex items-center gap-2">
								<Button variant="outline" size="sm">
									<Calendar className="mr-2 h-4 w-4" />
									Last 30 days
								</Button>
								<Button variant="outline" size="sm">
									<Filter className="mr-2 h-4 w-4" />
									Filter
								</Button>
								<Button variant="outline" size="sm">
									<Download className="mr-2 h-4 w-4" />
									Export
								</Button>
							</div>
						</div>

						<TabsContent value="overview" className="space-y-6">
							<div className="grid gap-6 lg:grid-cols-2">
								{/* Flight Bookings Chart */}
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<Plane className="h-5 w-5 text-primary" />
											Flight Bookings Trend
										</CardTitle>
										<CardDescription>
											Monthly booking volume and revenue
										</CardDescription>
									</CardHeader>
									<CardContent>
										<ResponsiveContainer
											width="100%"
											height={300}>
											<AreaChart data={flightBookingData}>
												<CartesianGrid strokeDasharray="3 3" />
												<XAxis dataKey="month" />
												<YAxis />
												<Tooltip />
												<Area
													type="monotone"
													dataKey="bookings"
													stroke="hsl(var(--primary))"
													fill="hsl(var(--primary) / 0.2)"
												/>
											</AreaChart>
										</ResponsiveContainer>
									</CardContent>
								</Card>

								{/* Gift Card Distribution */}
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<Gift className="h-5 w-5 text-primary" />
											Gift Card Distribution
										</CardTitle>
										<CardDescription>
											Popular gift card categories
										</CardDescription>
									</CardHeader>
									<CardContent>
										<ResponsiveContainer
											width="100%"
											height={300}>
											<PieChart>
												<Pie
													data={giftCardData}
													cx="50%"
													cy="50%"
													innerRadius={60}
													outerRadius={120}
													paddingAngle={5}
													dataKey="value">
													{giftCardData.map(
														(entry, index) => (
															<Cell
																key={`cell-${index}`}
																fill={
																	entry.color
																}
															/>
														)
													)}
												</Pie>
												<Tooltip />
											</PieChart>
										</ResponsiveContainer>
										<div className="mt-4 grid grid-cols-2 gap-2">
											{giftCardData.map((item, index) => (
												<div
													key={index}
													className="flex items-center gap-2">
													<div
														className="w-3 h-3 rounded-full"
														style={{
															backgroundColor:
																item.color,
														}}
													/>
													<span className="text-sm">
														{item.name}:{" "}
														{item.value}%
													</span>
												</div>
											))}
										</div>
									</CardContent>
								</Card>
							</div>

							{/* Crypto Trading Chart */}
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<Bitcoin className="h-5 w-5 text-primary" />
										Cryptocurrency Trading Activity
									</CardTitle>
									<CardDescription>
										24-hour trading volume and price
										movements
									</CardDescription>
								</CardHeader>
								<CardContent>
									<ResponsiveContainer
										width="100%"
										height={400}>
										<LineChart data={cryptoData}>
											<CartesianGrid strokeDasharray="3 3" />
											<XAxis dataKey="time" />
											<YAxis yAxisId="left" />
											<YAxis
												yAxisId="right"
												orientation="right"
											/>
											<Tooltip />
											<Line
												yAxisId="left"
												type="monotone"
												dataKey="btc"
												stroke="hsl(var(--chart-1))"
												strokeWidth={2}
												name="BTC Price"
											/>
											<Line
												yAxisId="left"
												type="monotone"
												dataKey="eth"
												stroke="hsl(var(--chart-2))"
												strokeWidth={2}
												name="ETH Price"
											/>
											<Bar
												yAxisId="right"
												dataKey="volume"
												fill="hsl(var(--chart-3) / 0.3)"
												name="Volume"
											/>
										</LineChart>
									</ResponsiveContainer>
								</CardContent>
							</Card>

							{/* Recent Transactions */}
							<Card>
								<CardHeader>
									<CardTitle>Recent Transactions</CardTitle>
									<CardDescription>
										Latest activity across all platforms
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										{recentTransactions.map(
											(transaction) => (
												<div
													key={transaction.id}
													className="flex items-center justify-between p-4 border rounded-lg">
													<div className="flex items-center gap-4">
														<div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
															{transaction.type ===
																"Flight" && (
																<Plane className="h-4 w-4" />
															)}
															{transaction.type ===
																"Gift Card" && (
																<Gift className="h-4 w-4" />
															)}
															{transaction.type ===
																"Crypto" && (
																<Bitcoin className="h-4 w-4" />
															)}
														</div>
														<div>
															<p className="font-medium">
																{
																	transaction.customer
																}
															</p>
															<p className="text-sm text-muted-foreground">
																{
																	transaction.type
																}{" "}
																•{" "}
																{transaction.id}
															</p>
														</div>
													</div>
													<div className="flex items-center gap-4">
														<div className="text-right">
															<p className="font-medium">
																{
																	transaction.amount
																}
															</p>
															<p className="text-sm text-muted-foreground">
																{
																	transaction.time
																}
															</p>
														</div>
														<Badge
															variant={
																transaction.status ===
																	"Completed" ||
																transaction.status ===
																	"Confirmed"
																	? "default"
																	: transaction.status ===
																			"Processing" ||
																	  transaction.status ===
																			"Pending"
																	? "secondary"
																	: "destructive"
															}>
															{transaction.status}
														</Badge>
														<Button
															variant="ghost"
															size="icon">
															<MoreHorizontal className="h-4 w-4" />
														</Button>
													</div>
												</div>
											)
										)}
									</div>
								</CardContent>
							</Card>
						</TabsContent>

						<TabsContent value="flights" className="space-y-6">
							<div className="grid gap-6 md:grid-cols-3">
								<Card>
									<CardHeader className="pb-2">
										<CardTitle className="text-sm font-medium">
											Total Bookings
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="text-2xl font-bold">
											1,803
										</div>
										<p className="text-xs text-muted-foreground">
											+12% from last week
										</p>
									</CardContent>
								</Card>
								<Card>
									<CardHeader className="pb-2">
										<CardTitle className="text-sm font-medium">
											Revenue
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="text-2xl font-bold">
											$247,050
										</div>
										<p className="text-xs text-muted-foreground">
											+8.5% from last week
										</p>
									</CardContent>
								</Card>
								<Card>
									<CardHeader className="pb-2">
										<CardTitle className="text-sm font-medium">
											Avg. Ticket Price
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="text-2xl font-bold">
											$450
										</div>
										<p className="text-xs text-muted-foreground">
											-2.1% from last week
										</p>
									</CardContent>
								</Card>
							</div>

							<div className="grid gap-6 lg:grid-cols-2">
								<Card>
									<CardHeader>
										<CardTitle>Popular Routes</CardTitle>
										<CardDescription>
											Top performing flight routes by
											bookings
										</CardDescription>
									</CardHeader>
									<CardContent>
										<ResponsiveContainer
											width="100%"
											height={300}>
											<BarChart data={flightStats}>
												<CartesianGrid strokeDasharray="3 3" />
												<XAxis dataKey="route" />
												<YAxis />
												<Tooltip />
												<Bar
													dataKey="bookings"
													fill="hsl(var(--primary))"
												/>
											</BarChart>
										</ResponsiveContainer>
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle>Recent Bookings</CardTitle>
										<CardDescription>
											Latest flight reservations
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="space-y-4 max-h-80 overflow-y-auto">
											{flightBookings
												.slice(0, 5)
												.map((booking) => (
													<div
														key={booking.id}
														className="flex items-center justify-between p-3 border rounded-lg">
														<div className="flex items-center gap-3">
															<div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
																<Plane className="h-4 w-4 text-primary" />
															</div>
															<div>
																<p className="font-medium text-sm">
																	{
																		booking.passenger
																	}
																</p>
																<p className="text-xs text-muted-foreground">
																	{
																		booking.route
																	}
																</p>
															</div>
														</div>
														<div className="text-right">
															<p className="font-medium text-sm">
																{booking.amount}
															</p>
															<Badge
																variant={
																	booking.status ===
																	"Confirmed"
																		? "default"
																		: booking.status ===
																		  "Pending"
																		? "secondary"
																		: "destructive"
																}
																className="text-xs">
																{booking.status}
															</Badge>
														</div>
													</div>
												))}
										</div>
									</CardContent>
								</Card>
							</div>

							<Card className="relative w-full">
								<CardHeader>
									<CardTitle>All Flight Bookings</CardTitle>
									<CardDescription>
										Complete list of flight reservations
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="overflow-x-auto">
										{/* <table className="w-full">
											<thead>
												<tr className="border-b">
													<th className="text-left p-2">
														Booking ID
													</th>
													<th className="text-left p-2">
														Passenger
													</th>
													<th className="text-left p-2">
														Route
													</th>
													<th className="text-left p-2">
														Departure
													</th>
													<th className="text-left p-2">
														Class
													</th>
													<th className="text-left p-2">
														Amount
													</th>
													<th className="text-left p-2">
														Status
													</th>
													<th className="text-left p-2">
														Actions
													</th>
												</tr>
											</thead>
											<tbody>
												{flightBookings.map(
													(booking) => (
														<tr
															key={booking.id}
															className="border-b">
															<td className="p-2 font-mono text-sm">
																{booking.id}
															</td>
															<td className="p-2">
																{
																	booking.passenger
																}
															</td>
															<td className="p-2">
																<div className="flex items-center gap-1">
																	<MapPin className="h-3 w-3" />
																	{
																		booking.route
																	}
																</div>
															</td>
															<td className="p-2">
																<div className="flex items-center gap-1">
																	<Clock className="h-3 w-3" />
																	{
																		booking.departure
																	}
																</div>
															</td>
															<td className="p-2">
																{booking.class}
															</td>
															<td className="p-2 font-medium">
																{booking.amount}
															</td>
															<td className="p-2">
																<Badge
																	variant={
																		booking.status ===
																		"Confirmed"
																			? "default"
																			: booking.status ===
																			  "Pending"
																			? "secondary"
																			: "destructive"
																	}>
																	{
																		booking.status
																	}
																</Badge>
															</td>
															<td className="p-2">
																<Button
																	variant="ghost"
																	size="sm">
																	<Eye className="h-4 w-4" />
																</Button>
															</td>
														</tr>
													)
												)}
											</tbody>
										</table> */}
									</div>
								</CardContent>
							</Card>
						</TabsContent>

						<TabsContent value="giftcards" className="space-y-6">
							<div className="grid gap-6 md:grid-cols-3">
								<Card>
									<CardHeader className="pb-2">
										<CardTitle className="text-sm font-medium">
											Total Orders
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="text-2xl font-bold">
											892
										</div>
										<p className="text-xs text-muted-foreground">
											-2.1% from last week
										</p>
									</CardContent>
								</Card>
								<Card>
									<CardHeader className="pb-2">
										<CardTitle className="text-sm font-medium">
											Revenue
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="text-2xl font-bold">
											$84,320
										</div>
										<p className="text-xs text-muted-foreground">
											+5.2% from last week
										</p>
									</CardContent>
								</Card>
								<Card>
									<CardHeader className="pb-2">
										<CardTitle className="text-sm font-medium">
											Avg. Order Value
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="text-2xl font-bold">
											$95
										</div>
										<p className="text-xs text-muted-foreground">
											+7.3% from last week
										</p>
									</CardContent>
								</Card>
							</div>

							<div className="grid gap-6 lg:grid-cols-2">
								<Card>
									<CardHeader>
										<CardTitle>Brand Performance</CardTitle>
										<CardDescription>
											Gift card sales by brand
										</CardDescription>
									</CardHeader>
									<CardContent>
										<ResponsiveContainer
											width="100%"
											height={300}>
											<BarChart data={giftCardStats}>
												<CartesianGrid strokeDasharray="3 3" />
												<XAxis dataKey="brand" />
												<YAxis />
												<Tooltip />
												<Bar
													dataKey="revenue"
													fill="hsl(var(--chart-2))"
												/>
											</BarChart>
										</ResponsiveContainer>
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle>Recent Orders</CardTitle>
										<CardDescription>
											Latest gift card purchases
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="space-y-4 max-h-80 overflow-y-auto">
											{giftCardOrders
												.slice(0, 5)
												.map((order) => (
													<div
														key={order.id}
														className="flex items-center justify-between p-3 border rounded-lg">
														<div className="flex items-center gap-3">
															<div className="h-8 w-8 rounded-full bg-chart-2/10 flex items-center justify-center">
																<Gift className="h-4 w-4 text-chart-2" />
															</div>
															<div>
																<p className="font-medium text-sm">
																	{
																		order.customer
																	}
																</p>
																<p className="text-xs text-muted-foreground">
																	{
																		order.brand
																	}
																</p>
															</div>
														</div>
														<div className="text-right">
															<p className="font-medium text-sm">
																{order.amount}
															</p>
															<Badge
																variant={
																	order.status ===
																	"Completed"
																		? "default"
																		: order.status ===
																				"Processing" ||
																		  order.status ===
																				"Pending"
																		? "secondary"
																		: "destructive"
																}
																className="text-xs">
																{order.status}
															</Badge>
														</div>
													</div>
												))}
										</div>
									</CardContent>
								</Card>
							</div>

							<Card>
								<CardHeader>
									<CardTitle>All Gift Card Orders</CardTitle>
									<CardDescription>
										Complete list of gift card orders
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="overflow-x-scroll w-full">
										{/* <table className="w-full">
											<thead>
												<tr className="border-b">
													<th className="text-left p-2">
														Order ID
													</th>
													<th className="text-left p-2">
														Customer
													</th>
													<th className="text-left p-2">
														Brand
													</th>
													<th className="text-left p-2">
														Amount
													</th>
													<th className="text-left p-2">
														Order Date
													</th>
													<th className="text-left p-2">
														Code
													</th>
													<th className="text-left p-2">
														Status
													</th>
													<th className="text-left p-2">
														Actions
													</th>
												</tr>
											</thead>
											<tbody>
												{giftCardOrders.map((order) => (
													<tr
														key={order.id}
														className="border-b">
														<td className="p-2 font-mono text-sm">
															{order.id}
														</td>
														<td className="p-2">
															{order.customer}
														</td>
														<td className="p-2">
															{order.brand}
														</td>
														<td className="p-2 font-medium">
															{order.amount}
														</td>
														<td className="p-2">
															{order.orderDate}
														</td>
														<td className="p-2 font-mono text-xs">
															{order.code}
														</td>
														<td className="p-2">
															<Badge
																variant={
																	order.status ===
																	"Completed"
																		? "default"
																		: order.status ===
																				"Processing" ||
																		  order.status ===
																				"Pending"
																		? "secondary"
																		: "destructive"
																}>
																{order.status}
															</Badge>
														</td>
														<td className="p-2">
															<Button
																variant="ghost"
																size="sm">
																<Eye className="h-4 w-4" />
															</Button>
														</td>
													</tr>
												))}
											</tbody>
										</table> */}
									</div>
								</CardContent>
							</Card>
						</TabsContent>

						<TabsContent value="crypto" className="space-y-6">
							<div className="grid gap-6 md:grid-cols-4">
								<Card>
									<CardHeader className="pb-2">
										<CardTitle className="text-sm font-medium">
											24h Volume
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="text-2xl font-bold">
											$8.2M
										</div>
										<p className="text-xs text-muted-foreground">
											+24.7% from yesterday
										</p>
									</CardContent>
								</Card>
								<Card>
									<CardHeader className="pb-2">
										<CardTitle className="text-sm font-medium">
											Total Trades
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="text-2xl font-bold">
											865
										</div>
										<p className="text-xs text-muted-foreground">
											+18.2% from yesterday
										</p>
									</CardContent>
								</Card>
								<Card>
									<CardHeader className="pb-2">
										<CardTitle className="text-sm font-medium">
											Active Users
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="text-2xl font-bold">
											342
										</div>
										<p className="text-xs text-muted-foreground">
											+12.5% from yesterday
										</p>
									</CardContent>
								</Card>
								<Card>
									<CardHeader className="pb-2">
										<CardTitle className="text-sm font-medium">
											Avg. Trade Size
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="text-2xl font-bold">
											$9,480
										</div>
										<p className="text-xs text-muted-foreground">
											+5.1% from yesterday
										</p>
									</CardContent>
								</Card>
							</div>

							<div className="grid gap-6 lg:grid-cols-2">
								<Card>
									<CardHeader>
										<CardTitle>
											Trading Pairs Volume
										</CardTitle>
										<CardDescription>
											24-hour trading volume by
											cryptocurrency pair
										</CardDescription>
									</CardHeader>
									<CardContent>
										<ResponsiveContainer
											width="100%"
											height={300}>
											<BarChart data={cryptoStats}>
												<CartesianGrid strokeDasharray="3 3" />
												<XAxis dataKey="pair" />
												<YAxis />
												<Tooltip />
												<Bar
													dataKey="volume"
													fill="hsl(var(--chart-3))"
												/>
											</BarChart>
										</ResponsiveContainer>
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle>Recent Orders</CardTitle>
										<CardDescription>
											Latest cryptocurrency transactions
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="space-y-4 max-h-80 overflow-y-auto">
											{cryptoOrders
												.slice(0, 5)
												.map((order) => (
													<div
														key={order.id}
														className="flex items-center justify-between p-3 border rounded-lg">
														<div className="flex items-center gap-3">
															<div
																className={`h-8 w-8 rounded-full flex items-center justify-center ${
																	order.type ===
																	"Buy"
																		? "bg-green-100 text-green-600"
																		: "bg-red-100 text-red-600"
																}`}>
																<Bitcoin className="h-4 w-4" />
															</div>
															<div>
																<p className="font-medium text-sm">
																	{order.user}
																</p>
																<p className="text-xs text-muted-foreground">
																	{order.type}{" "}
																	{
																		order.crypto
																	}
																</p>
															</div>
														</div>
														<div className="text-right">
															<p className="font-medium text-sm">
																{order.total}
															</p>
															<Badge
																variant={
																	order.status ===
																	"Completed"
																		? "default"
																		: order.status ===
																				"Processing" ||
																		  order.status ===
																				"Pending"
																		? "secondary"
																		: "destructive"
																}
																className="text-xs">
																{order.status}
															</Badge>
														</div>
													</div>
												))}
										</div>
									</CardContent>
								</Card>
							</div>

							<Card>
								<CardHeader>
									<CardTitle>All Crypto Orders</CardTitle>
									<CardDescription>
										Complete list of cryptocurrency buy/sell
										orders
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="overflow-x-auto">
										{/* <table className="w-full">
											<thead>
												<tr className="border-b">
													<th className="text-left p-2">
														Order ID
													</th>
													<th className="text-left p-2">
														User
													</th>
													<th className="text-left p-2">
														Type
													</th>
													<th className="text-left p-2">
														Crypto
													</th>
													<th className="text-left p-2">
														Amount
													</th>
													<th className="text-left p-2">
														Price
													</th>
													<th className="text-left p-2">
														Total
													</th>
													<th className="text-left p-2">
														Status
													</th>
													<th className="text-left p-2">
														Actions
													</th>
												</tr>
											</thead>
											<tbody>
												{cryptoOrders.map((order) => (
													<tr
														key={order.id}
														className="border-b">
														<td className="p-2 font-mono text-sm">
															{order.id}
														</td>
														<td className="p-2">
															{order.user}
														</td>
														<td className="p-2">
															<Badge
																variant={
																	order.type ===
																	"Buy"
																		? "default"
																		: "secondary"
																}>
																{order.type}
															</Badge>
														</td>
														<td className="p-2 font-medium">
															{order.crypto}
														</td>
														<td className="p-2">
															{order.amount}
														</td>
														<td className="p-2">
															{order.price}
														</td>
														<td className="p-2 font-medium">
															{order.total}
														</td>
														<td className="p-2">
															<Badge
																variant={
																	order.status ===
																	"Completed"
																		? "default"
																		: order.status ===
																				"Processing" ||
																		  order.status ===
																				"Pending"
																		? "secondary"
																		: "destructive"
																}>
																{order.status}
															</Badge>
														</td>
														<td className="p-2">
															<Button
																variant="ghost"
																size="sm">
																<Eye className="h-4 w-4" />
															</Button>
														</td>
													</tr>
												))}
											</tbody>
										</table> */}
									</div>
								</CardContent>
							</Card>
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</>
	);
}

export default AdminDashboardPage;
