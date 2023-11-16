package com.weather_app;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;
import android.widget.RemoteViews;
import com.squareup.picasso.Picasso;
import org.json.JSONException;
import org.json.JSONObject;

public class MyWidget extends AppWidgetProvider {

    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager, int appWidgetId) {
        try {
            SharedPreferences sharedPref = context.getSharedPreferences("DATA", Context.MODE_PRIVATE);
            String appString = sharedPref.getString("appData", "{\"name\":'no data'}");

            JSONObject data = new JSONObject(appString);
            RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.my_widget);

            // Kiểm tra xem URL hình ảnh có hợp lệ không
            String iconUrl = data.getString("conditionIcon");
            if (isValidUrl(iconUrl)) {
                Picasso.get().load(iconUrl).into(views, R.id.imageView, new int[] {R.layout.my_widget});
            }

            views.setTextViewText(R.id.appwidget_text, data.getString("name"));
            views.setTextViewText(R.id.textView2, data.getString("conditionText"));
            views.setTextViewText(R.id.textView, data.getString("degree"));

            appWidgetManager.updateAppWidget(appWidgetId, views);
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        // Có thể có nhiều widget đang hoạt động, vì vậy hãy cập nhật tất cả chúng
        for (int appWidgetId : appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId);
        }
    }

    @Override
    public void onEnabled(Context context) {
        // Hiển thị thông báo khi widget đầu tiên được tạo
        Toast.makeText(context, "Đã khởi tạo Widget cho ứng dụng thời tiết", Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onDisabled(Context context) {
        // Thực hiện chức năng liên quan khi widget cuối cùng bị vô hiệu hóa
        Toast.makeText(context, "Weather Widget đã bị vô hiệu hóa!", Toast.LENGTH_SHORT).show();
    }

    private static boolean isValidUrl(String url) {
        // Thực hiện kiểm tra xem URL có hợp lệ không
        return url != null && !url.isEmpty();
    }
}
