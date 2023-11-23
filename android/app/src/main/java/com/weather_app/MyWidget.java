package com.weather_app;


import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Log;
import android.widget.ImageView;
import android.widget.RemoteViews;
import com.squareup.picasso.Picasso;
import com.google.gson.Gson;
import com.weather_app.databinding.MyWidgetBinding;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;

public class MyWidget extends AppWidgetProvider {
    MyWidgetBinding binding;
    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager, int appWidgetId) {

        try {

            SharedPreferences sharedPref = context.getSharedPreferences("DATA", Context.MODE_PRIVATE);
            String appString = sharedPref.getString("appData", "{\"name\":'no data'}");



            JSONObject data = new JSONObject(appString);

            Log.d("HIEP",  data.getString("conditionIcon"));
            RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.my_widget);
            Picasso.get().load(data.getString("conditionIcon")).into(views, R.id.imageView, new int[] {R.layout.my_widget});



            views.setTextViewText(R.id.appwidget_text, data.getString("name"));
            views.setTextViewText(R.id.textView2, data.getString("conditionText"));
            views.setTextViewText(R.id.textView, data.getString("degree"));


//            views.setTextViewText(R.id.imageView2, "https://cdn.weatherapi.com/weather/64x64/day/122.png");
            appWidgetManager.updateAppWidget(appWidgetId, views);
        }catch (JSONException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        // There may be multiple widgets active, so update all of them
        for (int appWidgetId : appWidgetIds) {

            updateAppWidget(context, appWidgetManager, appWidgetId);
        }
    }

    @Override
    public void onEnabled(Context context) {
        // Enter relevant functionality for when the first widget is created
    }

    @Override
    public void onDisabled(Context context) {
        // Enter relevant functionality for when the last widget is disabled
    }
}

