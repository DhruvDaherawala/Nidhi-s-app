export default function DashboardPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold font-serif text-foreground mb-8">Dashboard Overview</h1>

            <div className="grid md:grid-cols-4 gap-6 mb-8">
                {[
                    { label: 'Total Sales', value: '$12,450', color: 'bg-primary/10 text-primary' },
                    { label: 'Active Orders', value: '14', color: 'bg-orange-100 text-orange-600' },
                    { label: 'Products', value: '25', color: 'bg-blue-100 text-blue-600' },
                    { label: 'Customers', value: '108', color: 'bg-purple-100 text-purple-600' },
                ].map((stat, i) => (
                    <div key={i} className="bg-card p-6 rounded-2xl shadow-sm border border-border">
                        <p className="text-muted-foreground text-sm font-medium mb-2">{stat.label}</p>
                        <p className={`text-3xl font-bold ${stat.color} inline-block px-2 py-1 rounded-lg bg-transparent`}>{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-card p-6 rounded-2xl shadow-sm border border-border">
                    <h2 className="font-bold mb-4">Recent Orders</h2>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex justify-between items-center p-4 hover:bg-muted/50 rounded-xl transition-colors border border-border/50">
                                <div>
                                    <p className="font-bold text-sm">Order #{1000 + i}</p>
                                    <p className="text-xs text-muted-foreground">2 items • $45.00</p>
                                </div>
                                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full font-medium">Pending</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-card p-6 rounded-2xl shadow-sm border border-border">
                    <h2 className="font-bold mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <button className="p-4 bg-primary/5 hover:bg-primary/10 rounded-xl text-primary font-medium transition-colors border border-primary/10 flex flex-col items-center justify-center gap-2">
                            <span className="text-xl">+</span> Add Product
                        </button>
                        <button className="p-4 bg-secondary/10 hover:bg-secondary/20 rounded-xl text-foreground font-medium transition-colors border border-secondary/20">
                            View Inquiries
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
