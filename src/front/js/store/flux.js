const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			login: async (email,pass)=>{
				const opts = {
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					  },
					  method: "POST",
					  body: JSON.stringify({
						email: email,
						password: pass
					})
				};
				try{
				const resp = await fetch('https://3001-4geeksacade-reactflaskh-og1k1q5prdd.ws-eu77.gitpod.io/api/token', opts)
					if(resp.status !== 200){
					alert("there has been an error");
					return false;
					}
					const data = await resp.json();
					console.log("from Backend", data)
					sessionStorage.setItem("token", data.access_token)
					setStore({token:data.access_token})
				}
				catch(error){console.error("there has been an error")}
	
			},
			syncTokenFromSesStore: () =>{
				const token=sessionStorage.getItem("token")
				if(token && token!="" && token!=undefined) setStore({token: token})
			},
			logout: ()=>{
				sessionStorage.removeItem("token");
				console.log("logging out"); 
				setStore({token: null});
			},

			getMessage: async () => {
				const store = getStore();
				const opts = {
					headers: {
						"Authorisation": "Bearer " + store.token
					}
				};
				fetch("https://3001-4geeksacade-reactflaskh-og1k1q5prdd.ws-eu77.gitpod.io/api/private", opts)
				.then(resp=>resp.json())
				.then(data=>setStore({message:data.message}))
				.catch(error=>console.log("error loading message from backend",error));
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
