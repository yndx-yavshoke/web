package utils

import client.ShokClient
import io.restassured.RestAssured
import model.TestUser
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.BeforeAll
import java.time.LocalDateTime

open class baseTest {

    companion object {
        lateinit var shokClient: ShokClient
        lateinit var startTime: LocalDateTime


        @BeforeAll
        @JvmStatic
        fun setup() {
            startTime = LocalDateTime.now()
            println("===Начало выполнения тестов===")
            RestAssured.enableLoggingOfRequestAndResponseIfValidationFails()
            shokClient = ShokClient()
            println("Мы подключиличь к серверу: ${Config.baseUrl}")
        }

        @AfterAll
        @JvmStatic
        fun testDown() {
            val duration = java.time.Duration.between(startTime, LocalDateTime.now())
            println("\n=== Тесты завершены ===")
            println("Общее выполнение времени: ${duration.seconds} сек.")
        }
    }



}