module.exports =  {
    logout: async (req, res) =>{
        return res.clearCookie("token").redirect(`/`);
    }
}