package tests

import model.ExistUserData
import model.RegisterUser
import model.UserLogIn
import model.UserName
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.MethodOrderer
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestMethodOrder
import org.junit.jupiter.api.assertAll
import utils.baseTest
import utils.randomAge
import utils.randomEmail
import utils.randomErrorPassword
import utils.randomName
import utils.randomPassword
import kotlin.test.assertEquals

@TestMethodOrder(MethodOrderer.OrderAnnotation::class)
class ShokApiTests: baseTest() {

    @Test
    fun registerNewUserYang(){
        println("\n[Тест] Регистрация новго пользователя. (Молоденький котик)")

        val email = randomEmail()
        val password = randomPassword()
        val age = randomAge("yang")

        val newUser = shokClient.registerUser(RegisterUser(
            email = email,
            password = password,
            age = age))

        assertAll(
            {println("Закинули данные с новым пользователем.")},
            {assertThat(newUser.user.email).isEqualTo(email)},
            {println("Проверка произведена пользователь зарегистрирован: ${newUser}")}
        )
    }

    @Test
    fun registerNewUserAdult(){
        println("\n[Тест] Регистрация новго пользователя. (Взрослый котик)")

        val email = randomEmail()
        val password = randomPassword()
        val age = randomAge("adult")

        val newUser = shokClient.registerUser(RegisterUser(
            email = email,
            password = password,
            age = age))

        assertAll(
            {println("Закинули данные с новым пользователем.")},
            {assertThat(newUser.user.email).isEqualTo(email)},
            {println("Проверка произведена пользователь зарегистрирован: ${newUser}")}
        )
    }

    @Test
    fun registerNewUserOld(){
        println("\n[Тест] Регистрация новго пользователя. (Старый котик)")

        val email = randomEmail()
        val password = randomPassword()
        val age = randomAge("old")

        val newUser = shokClient.registerUser(RegisterUser(
            email = email,
            password = password,
            age = age))

        assertAll(
            {println("Закинули данные с новым пользователем.")},
            {assertThat(newUser.user.email).isEqualTo(email)},
            {println("Проверка произведена пользователь зарегистрирован: ${newUser}")}
        )
    }

    @Test
    fun existEmailTestTrue(){
        println("\n[Тест] Проерка наличия email. (Зарегистрированный)")

        val email = randomEmail()
        val password = randomPassword()
        val age = randomAge()

        val newUser = shokClient.registerUser(RegisterUser(
            email = email,
            password = password,
            age = age
        ))

        val existEmail = shokClient.existUser(ExistUserData(newUser.user.email))

        assertAll(
            {println("Email введен, ответ от сервера получен, сверяем.")},
            {assertThat(existEmail.exist).isEqualTo(true)}
        )
        println("Тест выполнен: результат проверки (шоковсти)- ${existEmail.exist}")
    }

    @Test
    fun existEmailTestFalse(){
        println("\n[Тест] Проерка наличия email. (НЕ зарегистрированный)")

        val existEmail = shokClient.existUser(ExistUserData(randomEmail()))

        assertAll(
            {println("Email введен, ответ от сервера получен, сверяем.")},
            {assertThat(existEmail.exist).isEqualTo(false)}
        )
        println("Тест выполнен: результат - ${existEmail.exist}")
    }

    @Test
    fun loginUserTrue(){
        println("\n[Тест] Вход зарегистрированного пользователя.")

        val email = randomEmail()
        val password = randomPassword()
        val age = randomAge()

        val newUser = shokClient.registerUser(RegisterUser(
            email = email,
            password = password,
            age = age
        ))

        val loginUser = shokClient.loginUser(UserLogIn(
            email = newUser.user.email,
            password = password))

        assertAll(
            {println("Проверка входа пользователя")},
            {assertThat(loginUser.user.email).isEqualTo(email)}
        )
        println("Тест выполнен: результат - ${loginUser.user.email}")
        println(loginUser)
    }

    @Test
    fun loginUserFalsePassword(){
        println("\n[Тест] Вход в приложение с неверным паролем")

        val email = randomEmail()
        val password = randomPassword()
        val age = randomAge()

        val newUser = shokClient.registerUser(RegisterUser(
            email = email,
            password = password,
            age = age
        ))

        val (statuseCode, responsBody) = shokClient.errorLoginUser(UserLogIn(
            email = newUser.user.email,
            password = randomErrorPassword()))

        assertAll(
            {println("Тест запущен, отправлен email и пароль не соответсвующий ему")},
            {assertEquals(422, statuseCode)},
            {println("Полученный статус код сравнили со значением 422: рез. - $statuseCode")},
            {assertThat(responsBody.fields.password).isEqualTo("Неправильный логин или пароль")},
            {println("Сравнили результаты полученных ответов, сообщение: $responsBody")}
        )
    }

    @Test
    fun newNameUser(){
        println("\n[Тест] Изменение имени пользователя")

        val email = randomEmail()
        val password = randomPassword()
        val age = randomAge()
        val name = randomName()

        val newUser = shokClient.registerUser(RegisterUser(
            email = email,
            password = password,
            age = age
        ))

        val loginUser = shokClient.loginUser(UserLogIn(
            email = newUser.user.email,
            password = password))

        val renameUser = shokClient.renameUser(
            name = UserName(name),
            token = loginUser.token)

        assertAll(
            {println("Проверка входа пользователя")},
            {assertThat(renameUser.user.name).isEqualTo(name)}
        )
        println("Тест выполнен: результат - ${renameUser.user.name}")
        println(renameUser)

    }

    @Test
    fun openApkNonLogout(){
        println("\n[тест] Запуск приложения без логАут Yang пользователя")

        val email = randomEmail()
        val password = randomPassword()
        val age = randomAge()

        val newUser = shokClient.registerUser(RegisterUser(
            email = email,
            password = password,
            age = age
        ))

        val loginUser = shokClient.loginUser(UserLogIn(
            email = newUser.user.email,
            password = password))

        val userMe = shokClient.userMe(token = loginUser.token)

        assertAll(
            {println("Запустил приложение молоденький котик. Ручка дернулась.")},
            {assertThat(userMe.user.email).isEqualTo(email)}
        )
        println("Тест выполнен, автоматическое вхождение молоденьго котика. ${userMe}")
    }

    @Test
    fun openApkNonLogoutInvalToken(){
        println("\n[тест] Запуск приложения без логАут с неверным токеном")

        val invalidToken = "invalid_token_123"

        val (stusCode, responsBody) = shokClient.userMeInvalid(invalidToken)

        assertAll(
            {println("Тест запущен, неверный токен улетел. Ждем результат.")},
            {assertEquals(401, stusCode)},
            {println("Полученный статус код сравнили с значением 401: рез. - $stusCode")},
            {assertThat(responsBody.message).isEqualTo("Invalid token")},
            {println("Сравнили результат, полученное сообщение: $responsBody")}
        )
    }

}