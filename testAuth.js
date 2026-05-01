const registerAdmin = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: 'Gralix Admin',
                email: 'admin@gralix.com',
                password: 'luxuryPassword123!',
                role: 'admin'
            })
        });

        const data = await response.json();
        
        if (data.success) {
            console.log('✅ Admin Account Created Successfully!');
            console.log('Here is your VIP Access Token (JWT):');
            console.log(data.token);
        } else {
            console.error('❌ Registration Failed:', data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

registerAdmin();