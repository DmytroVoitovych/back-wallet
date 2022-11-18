

const funcGetCurrentUser = async (req, res) => {
    const { email, name } = req.user;

    res.json({
        status: 200,
        data: {email, name}
    });

}; 

module.exports = funcGetCurrentUser;