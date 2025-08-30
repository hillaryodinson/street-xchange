import { Logo } from "@/components/generic/logo";
import { Loader2 } from "lucide-react";
import Link from "next/link";

const LoginPage = () => {
	// const params = useParams();
	// const { setSession, isAuthenticated } = useAuthStore((state) => state);
	// const redirect = useNavigate();
	// const [isLoading, startTransition] = useTransition();

	// const {
	// 	register,
	// 	handleSubmit,
	// 	formState: { errors },
	// } = useForm<z.infer<typeof LoginSchema>>({
	// 	resolver: zodResolver(LoginSchema),
	// 	defaultValues: {
	// 		email: "",
	// 		password: "",
	// 	},
	// });

	// const formSubmit = (data: z.infer<typeof LoginSchema>) => {
	// 	startTransition(() => {
	// 		api.post("/auth/login", data)
	// 			.then((response) => {
	// 				if (response.status !== 200) {
	// 					throw new Error("Invalid username or password");
	// 				}

	// 				const { data, success, message } =
	// 					response.data as ApiResponse<AuthResponse>;
	// 				if (success) {
	// 					if (data) {
	// 						toast.success("Login was successful");

	// 						// context.login(data);
	// 						setSession(data.user, data.token, data.isVerified);

	// 						//check for callbackurl
	// 						setTimeout(() => {
	// 							const callback =
	// 								params.redirect || "/dashboard";
	// 							redirect(callback);
	// 						}, 3000);
	// 					}
	// 				} else {
	// 					throw new Error(message);
	// 				}
	// 			})
	// 			.catch((errors) => {
	// 				toast.error(errors.response.data.message);
	// 			});
	// 	});
	// };

	// if (isAuthenticated()) {
	// 	return <Navigate to="/dashboard" />;
	// }

	return <div className="w-full h-[100%] bg-red-200!"></div>;
};

export default LoginPage;
