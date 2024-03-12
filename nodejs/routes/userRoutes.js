    const express = require("express");
    const { OAuth2Client } = require('google-auth-library');
    const client = new OAuth2Client(process.env["CLIENT_ID "]);
    const path = require('path');
    const router = express.Router();
    const userController = require("../controllers/userController");
    const passport = require('passport');
    const {isAuthenticated} = require("passport/lib/http/request");
    require('../passport/googleStrategy')();
    const axios = require('axios');
    const jwt = require('jsonwebtoken');
    const JWT_SECRET = process.env.JWT_SECRET;

    /**
     * @swagger
     * tags:
     *   name: Users
     *   description: API operations related to users
     */

    /**
     * @swagger
     * /users:
     *   get:
     *     summary: Get all users
     *     description: Retrieve a list of all users.
     *     tags: [Users]
     *     responses:
     *       200:
     *         description: A list of users.
     *       500:
     *         description: Internal Server Error.
     */
    router.get("/", userController.getAllUsers);

    /**
     * @swagger
     * /users/{id}:
     *   get:
     *     summary: Get user by ID
     *     description: Retrieve detailed information about a user based on ID.
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Detailed information about the user.
     *       404:
     *         description: User not found.
     *       500:
     *         description: Internal Server Error.
     */

    /**
     * @swagger
     * /auth/google:
     *   get:
     *     summary: Google OAuth2 로그인을 시작합니다.
     *     description: Google OAuth2 로그인을 시작합니다. 사용자에게는 프로필 및 이메일 정보에 대한 권한이 필요합니다.
     *     tags: [Users]
     *     responses:
     *       302:
     *         description: Google 로그인 페이지로 리다이렉트됩니다.
     *       400:
     *         description: 요청이 잘못된 경우의 에러 응답입니다.
     *       500:
     *         description: 서버에서 오류가 발생한 경우의 에러 응답입니다.
     */

    router.get("/auth/google", passport.authenticate('google', { scope: ['profile', 'email'] }));

    router.get('/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/' }),
        (req, res) => {
            // 여기서 추가 정보 입력 화면을 렌더링하거나 리다이렉트합니다.
            console.log(req.user);
            res.render('userInfo', { user: req.user });
        }
    );

    // router.post('/login', async (req, res, next) => {
    //     try {
    //         console.log(req.body.accessToken);
    //         const ticket = await client.verifyIdToken({
    //             idToken: req.body.accessToken
    //         });
    //         const payload = ticket.getPayload();
    //         const userId = payload['sub'];
    //
    //         console.log(payload);
    //         res.json(200);
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ error: 'Internal Server Error' });
    //     }
    // })

    router.post('/login', async (req, res, next) => {
        try {
            const accessToken = req.body.accessToken;
            const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            const userEmail = response.data.email;
            const exUser =  await userController.getUserByEmail(userEmail);
            console.log(exUser);
            if (exUser) {
                const token = jwt.sign({ userEmail }, JWT_SECRET, { expiresIn: '1h' });
                res.json({
                    "token": token,
                    "userInfo": exUser
                });
            } else {
                res.json({
                    "token": accessToken,
                    "userInfo": exUser
                })
            }

        } catch (error) {
            console.error('Error fetching Google user info:', error);
            throw error;
        }
    })

    router.get("/logout", (req, res, next) => {
        req.logout((err) => {
            if (err) { return next(err); }
            req.session.destroy();
            res.redirect('/users/profile');
        });
    });

    router.post('/join', async (req, res) => {
        // 여기서 사용자의 추가 정보를 받아와서 createUser 함수 호출
        const { userEmail, nickname, username, major } = req.body;

        // sessionId = Object.keys(req.sessionStore.sessions)[0];
        // const userData = JSON.parse(req.sessionStore.sessions[sessionId]);
        // const userEmail = userData.passport.user;
        // 사용자 생성
        const newUser = await userController.createUser(userEmail, nickname, username, major );
        // 사용자 생성 후 리다이렉트 또는 응답 처리
        const token = jwt.sign({ userEmail }, JWT_SECRET, { expiresIn: '1h' });
        res.json({
            "token": token,
            "userInfo": newUser
        });
    });

    router.get('/withdrawal', (req, res) => {
        const currentUser = req.user;

        const userEmail = currentUser.email;
        //userController.deleteUser();
    });

    router.get('/profile', (req, res) => {
        // req.isAuthenticated()를 사용하여 로그인 여부를 확인할 수 있습니다.
        if (req.isAuthenticated()) {
            // req.user를 통해 현재 로그인한 사용자 정보에 접근할 수 있습니다.
            const currentUser = req.user;
            res.send(`현재 로그인한 사용자: ${currentUser.username}`);
        } else {
            res.send('로그인되어 있지 않습니다.');
        }
    });
    /**
     * @swagger
     * /users/{id}:
     *   put:
     *     summary: Update user by ID
     *     description: Update user information based on ID.
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/User'  # Reference to User schema
     *     responses:
     *       200:
     *         description: User updated successfully.
     *       404:
     *         description: User not found.
     *       500:
     *         description: Internal Server Error.
     */
    router.put("/:id", userController.updateUser);

    /**
     * @swagger
     * /users/{id}:
     *   delete:
     *     summary: Delete user by ID
     *     description: Delete a user based on ID.
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       204:
     *         description: User deleted successfully.
     *       404:
     *         description: User not found.
     *       500:
     *         description: Internal Server Error.
     */
    router.delete("/:id", userController.deleteUser);

    module.exports = router;
