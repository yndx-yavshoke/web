//Чтобы прочитать текст, запустить код в любой IDE с поддержкой Kotlin

import kotlin.random.Random
import java.util.concurrent.TimeUnit


class QaEngineer(val name: String) {

    private val corgi = CorgiTester()
    private val cavalier = CavalierTester()


    var bugsFound: Int = 0
        private set


    fun testFeature(feature: Feature): List<Bug> {
        println("🐕 $name начинает тестирование фичи: ${feature.name}")

        val foundBugs = mutableListOf<Bug>()


        repeat(feature.complexity) { iteration ->
            println("\n🔍 Итерация ${iteration + 1}")


            corgi.testLoad(feature).takeIf { it != null }?.let {
                foundBugs.add(it)
                println("🦴 Корги нашел баг: ${it.description}")
            }


            cavalier.testUsability(feature).takeIf { it != null }?.let {
                foundBugs.add(it)
                println("🐾 Кавалер нашел баг: ${it.description}")
            }


            val humanBug = findBugs(feature)
            humanBug?.let {
                foundBugs.add(it)
                println("👨💻 $name нашел баг: ${it.description}")
            }


            takeCoffeeBreak()
        }

        bugsFound += foundBugs.size
        return foundBugs
    }


    private fun findBugs(feature: Feature): Bug? {
        return when (Random.nextInt(100)) {
            in 0..10 -> Bug("Критический: ${feature.name} не работает", Severity.CRITICAL)
            in 11..30 -> Bug("Средний: ${feature.name} работает странно", Severity.MEDIUM)
            in 31..60 -> Bug("Косметический: ${feature.name} выглядит некрасиво", Severity.LOW)
            else -> null
        }
    }


    private fun takeCoffeeBreak() {
        println("\n☕ Делаю перерыв на кофе...")
        TimeUnit.SECONDS.sleep(2)
        println("${corgi.name} требует печенье!")
        corgi.receiveTreat()
    }
}


class CorgiTester {
    val name = "Корги-тестировщик"

    fun testLoad(feature: Feature): Bug? {
        println("$name проводит нагрузочное тестирование...")
        return when (Random.nextInt(10)) {
            0 -> Bug("Фича ${feature.name} сломалась под нагрузкой (10 запросов в секунду)", Severity.CRITICAL)
            1 -> Bug("${feature.name} не выдержала моего взгляда", Severity.HIGH)
            else -> null
        }.also {
            if (it != null) receiveTreat()
        }
    }

    fun receiveTreat() {
        println("$name получает вкусняшку за найденный баг 🦴")
    }
}


class CavalierTester {
    val name = "Кавалер-тестировщик"

    fun testUsability(feature: Feature): Bug? {
        println("$name проверяет удобство использования...")
        return when (Random.nextInt(10)) {
            0 -> Bug("Фича ${feature.name} недостаточно дружелюбная", Severity.MEDIUM)
            1 -> Bug("В ${feature.name} не хватает мимимишности", Severity.LOW)
            else -> null
        }.also {
            if (it != null) receivePets()
        }
    }

    fun receivePets() {
        println("$name получает поглаживания за найденный баг 🐾")
    }
}


data class Feature(val name: String, val complexity: Int)
data class Bug(val description: String, val severity: Severity)

enum class Severity {
    CRITICAL, HIGH, MEDIUM, LOW
}


fun main() {
    val qa = QaEngineer("Анжелика")

    val features = listOf(
        Feature("Авторизация", 3),
        Feature("Корзина покупок", 5),
        Feature("Лента новостей", 2)
    )

    features.forEach { feature ->
        val bugs = qa.testFeature(feature)
        println("\n=== По итогам тестирования '${feature.name}' найдено ${bugs.size} багов ===")
        bugs.forEach { println("[${it.severity}] ${it.description}") }
    }

    println("\n✅ Всего найдено багов: ${qa.bugsFound}")
    println("🐕🦺 Собаки-тестировщики довольны проделанной работой!")
}