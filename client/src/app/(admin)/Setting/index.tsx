import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RatingSetting from "./RateSetting";
import WalletSetting from "./WalletSetting";

const SettingsPage = () => {
	return (
		<div className="container py-10">
			<div className="mb-8">
				<h1 className="text-3xl font-bold tracking-tight">Settings</h1>
				<p className="text-muted-foreground">
					Manage your application settings and preferences.
				</p>
			</div>

			<Tabs defaultValue="general" className="space-y-4">
				<TabsList>
					<TabsTrigger value="general">General</TabsTrigger>
					<TabsTrigger value="wallets">Wallets</TabsTrigger>
				</TabsList>

				<TabsContent value="general">
					<RatingSetting />
				</TabsContent>
				<TabsContent value="wallets">
					<WalletSetting />
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default SettingsPage;
