package com.anonymous.mobile

import android.view.View
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.uimanager.NativeViewHierarchyManager
import com.facebook.react.uimanager.UIBlock
import com.facebook.react.uimanager.UIManagerModule

class TestIdModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "TestIdModule"
    }

    @ReactMethod
    fun setTestId(viewTag: Int, testId: String, promise: Promise) {
        val uiManager = reactApplicationContext.getNativeModule(UIManagerModule::class.java)
        
        uiManager?.addUIBlock(object : UIBlock {
            override fun execute(nativeViewHierarchyManager: NativeViewHierarchyManager) {
                try {
                    val view = nativeViewHierarchyManager.resolveView(viewTag)
                    
                    // Generate a unique resource ID for this test ID
                    val resourceId = generateResourceId(testId)
                    
                    // Set the ID on the view
                    view.id = resourceId
                    
                    // Also set the tag for additional identification
                    view.tag = testId
                    
                    promise.resolve(resourceId)
                } catch (e: Exception) {
                    promise.reject("SET_TEST_ID_ERROR", "Failed to set test ID: ${e.message}", e)
                }
            }
        })
    }

    @ReactMethod
    fun setTestIdByTag(reactTag: String, testId: String, promise: Promise) {
        val uiManager = reactApplicationContext.getNativeModule(UIManagerModule::class.java)
        
        uiManager?.addUIBlock(object : UIBlock {
            override fun execute(nativeViewHierarchyManager: NativeViewHierarchyManager) {
                try {
                    // Find view by react tag
                    val view = findViewByReactTag(nativeViewHierarchyManager, reactTag)
                    
                    if (view != null) {
                        val resourceId = generateResourceId(testId)
                        view.id = resourceId
                        view.tag = testId
                        promise.resolve(resourceId)
                    } else {
                        promise.reject("VIEW_NOT_FOUND", "View with react tag '$reactTag' not found")
                    }
                } catch (e: Exception) {
                    promise.reject("SET_TEST_ID_ERROR", "Failed to set test ID: ${e.message}", e)
                }
            }
        })
    }

    private fun generateResourceId(testId: String): Int {
        // Generate a consistent resource ID based on the test ID string
        // This ensures the same test ID always gets the same resource ID
        return testId.hashCode() and 0x7FFFFFFF // Ensure positive integer
    }

    private fun findViewByReactTag(manager: NativeViewHierarchyManager, reactTag: String): View? {
        // This is a simplified implementation
        // In a real scenario, you might need to traverse the view hierarchy
        // or maintain a mapping of react tags to views
        return null
    }

    companion object {
        const val NAME = "TestIdModule"
    }
} 