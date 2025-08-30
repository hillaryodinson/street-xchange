import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { giftCardTypes, countries, cardTypes } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { BankType, giftCardFormType } from "@/utils/types";

interface ConfirmGiftCardSaleProps {
	onPreviousStep: () => void;
	onConfirmSale: () => void;
	saleDetails: giftCardFormType;
	uploadedImages: string[];
	selectedAccount?: BankType | null;
}
const ConfirmGiftCardSale = ({
	onPreviousStep,
	onConfirmSale,
	saleDetails,
	uploadedImages,
	selectedAccount,
}: ConfirmGiftCardSaleProps) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Review Your Gift Card Sale</CardTitle>
				<CardDescription>
					Please review your gift card details before confirming
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="rounded-md bg-muted p-4 space-y-4">
					<div className="flex justify-between items-center border-b pb-2">
						<h3 className="font-medium">Gift Card Details</h3>
						<Button
							variant="outline"
							size="sm"
							onClick={() => onPreviousStep()}>
							Edit
						</Button>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div>
							<p className="text-sm text-muted-foreground">
								Gift Card
							</p>
							<p className="font-medium">
								{
									giftCardTypes.find(
										(c) => c.value === saleDetails.cardType
									)?.label
								}
							</p>
						</div>
						<div>
							<p className="text-sm text-muted-foreground">
								Country
							</p>
							<p className="font-medium">
								{
									countries.find(
										(c) => c.value === saleDetails.country
									)?.label
								}
							</p>
						</div>
						<div>
							<p className="text-sm text-muted-foreground">
								Card Type
							</p>
							<p className="font-medium">
								{
									cardTypes.find(
										(t) => t.value === saleDetails.type
									)?.label
								}
							</p>
						</div>
						<div>
							<p className="text-sm text-muted-foreground">
								Amount
							</p>
							<p className="font-medium">${saleDetails.amount}</p>
						</div>
						<div>
							<p className="text-sm text-muted-foreground">
								Exchange Rate
							</p>
							<p className="font-medium"></p>
						</div>
						<div>
							<p className="text-sm text-muted-foreground">
								You'll Receive
							</p>
							<p className="font-medium text-lg text-primary"></p>
						</div>
					</div>
				</div>

				<div className="rounded-md bg-muted p-4 space-y-4">
					<div className="border-b pb-2">
						<h3 className="font-medium">Card Information</h3>
					</div>

					<div className="space-y-2">
						<div>
							<p className="text-sm text-muted-foreground">
								Card Number / Code
							</p>
							<p className="font-medium">
								{saleDetails.cardNumber}
							</p>
						</div>

						{saleDetails.pin && (
							<div>
								<p className="text-sm text-muted-foreground">
									PIN
								</p>
								<p className="font-medium">{saleDetails.pin}</p>
							</div>
						)}

						{saleDetails.additionalInfo && (
							<div>
								<p className="text-sm text-muted-foreground">
									Additional Information
								</p>
								<p className="font-medium">
									{saleDetails.additionalInfo}
								</p>
							</div>
						)}

						{uploadedImages.length > 0 && (
							<div>
								<p className="text-sm text-muted-foreground mb-2">
									Card Images
								</p>
								<div className="grid grid-cols-4 gap-2">
									{uploadedImages.map((image, index) => (
										<div
											key={index}
											className="relative aspect-square rounded-md overflow-hidden border">
											<img
												src={
													image || "/placeholder.svg"
												}
												alt={`Card image ${index + 1}`}
												className="w-full h-full object-cover"
											/>
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				</div>

				<div className="rounded-md bg-muted p-4 space-y-4">
					<div className="border-b pb-2">
						<h3 className="font-medium">Bank Account Details</h3>
					</div>

					<div className="space-y-2">
						<div className="grid grid-cols-2 gap-4">
							<div>
								<p className="text-sm text-muted-foreground">
									Bank Name
								</p>
								<p className="font-medium">
									{selectedAccount?.bankName || "N/A"}
								</p>
							</div>
							<div>
								<p className="text-sm text-muted-foreground">
									Account Number
								</p>
								<p className="font-medium">
									{selectedAccount?.accountNo || "N/A"}
								</p>
							</div>
							<div>
								<p className="text-sm text-muted-foreground">
									Account Name
								</p>
								<p className="font-medium">
									{selectedAccount?.accountName || "N/A"}
								</p>
							</div>
						</div>
					</div>
				</div>
			</CardContent>
			<CardFooter className="flex flex-col gap-4">
				<Button onClick={onConfirmSale} className="w-full">
					Confirm Sale
				</Button>
				<Button
					variant="outline"
					onClick={() => onPreviousStep()}
					className="w-full">
					Go Back
				</Button>
			</CardFooter>
		</Card>
	);
};

export default ConfirmGiftCardSale;
