package client

import io.restassured.RestAssured
import io.restassured.builder.RequestSpecBuilder
import utils.Config
import io.restassured.response.Response
import io.restassured.http.ContentType
import io.restassured.specification.RequestSpecification
import model.ErrorLogin
import model.ErrorMessage
import model.Exist
import model.ExistUserData
import model.LoggedUser
import model.RegisterUser
import model.UserLogIn
import model.UserMe
import model.UserName
import utils.JsonUtils


open class ShokClient {

    // private val baseUrl = "http://localhost:3000"  // "https://api.yavshok.ru"

    private val baseSpec: RequestSpecification = RequestSpecBuilder()
        .setBaseUri(Config.baseUrl)
        .setContentType(ContentType.JSON)
        .build()

    private fun aurhSpec(token: String): RequestSpecification{
        return RequestSpecBuilder()
            .addRequestSpecification(baseSpec)
            .addHeader("Authorization", "Bearer $token")
            .build()
    }

    fun existUser(existUserData: ExistUserData) : Exist{
        val response: Response = RestAssured.given()
            .spec(baseSpec)
            .body(JsonUtils.toJson(existUserData))
            .post("/exist")

        return JsonUtils.fromJson<Exist>(response.body.asString())
    }

    fun loginUser(userLogIn: UserLogIn) : LoggedUser{
        val response: Response = RestAssured.given()
            .spec(baseSpec)
            .body(JsonUtils.toJson(userLogIn))
            .post("/auth/login")
            .then()
            .extract()
            .response()

        return JsonUtils.fromJson<LoggedUser>(response.body.asString())
    }

    fun renameUser(name: UserName, token: String) : UserMe {
        val response: Response = RestAssured.given()
            .spec(aurhSpec(token))
            .body(JsonUtils.toJson(name))
            .patch("/user/name")

        return JsonUtils.fromJson<UserMe>(response.body.asString())
    }

    fun registerUser(registerUser: RegisterUser) : LoggedUser {
        val response: Response = RestAssured.given()
            .spec(baseSpec)
            .body(JsonUtils.toJson(registerUser))
            .post("/auth/register")
        return JsonUtils.fromJson<LoggedUser>(response.body.asString())
    }

    fun userMe(token: String) : UserMe {
        val response: Response = RestAssured.given()
            .spec(aurhSpec(token))
            .get("/user/me")
        return JsonUtils.fromJson<UserMe>(response.body.asString())
    }

    fun userMeInvalid(token: String) : Pair<Int, ErrorMessage> {
        val response: Response = RestAssured.given()
            .spec(aurhSpec(token))
            .get("/user/me")
            .then()
            .extract()
            .response()

        return Pair(response.statusCode, JsonUtils.fromJson<ErrorMessage>(response.body.asString()))
    }

    fun errorLoginUser(userLogIn: UserLogIn) : Pair<Int, ErrorLogin> {
        val response: Response = RestAssured.given()
            .spec(baseSpec)
            .body(JsonUtils.toJson(userLogIn))
            .post("/auth/login")
            .then()
            .extract()
            .response()

        return Pair(response.statusCode, JsonUtils.fromJson<ErrorLogin>(response.body.asString()))
    }



}