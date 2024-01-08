<!DOCTYPE html>

<html>
<head>
    <title>Xác nhận đặt hàng thành công</title>
</head>
<body>

<h1>Xác nhận đặt hàng thành công</h1>

<p>
    Chào {{$order->user_name}},
</p>

<p>
    Cảm ơn quý khách đã đặt hàng tại <strong>Torano</strong>!
</p>

<p>
    Đơn hàng của quý khách đã được xác nhận thành công. Thông tin chi tiết về đơn hàng như sau:
</p>

<table>

    <tr>
        <th>Ngày đặt hàng</th>
        <td>{{$order->created_at}}</td>
    </tr>
    <tr>
        <th>Thời gian dự kiến giao hàng</th>
        <td>Giao hàng trong vòng 2 đến 4 ngày</td>
    </tr>
    <tr>
        <th>Tổng giá trị đơn hàng</th>
        <td>{{$order->total_amount}}</td>
    </tr>
    <tr>
        <th>Địa chỉ nhận hàng</th>
        <td>{{$order->address}},{{$order->ward}},{{$order->district}},{{$order->province}},</td>
    </tr>
</table>

<p>
    Chi tiết sản phẩm/dịch vụ:
</p>


<p>
    Quý khách vui lòng kiểm tra lại thông tin đơn hàng và thông báo cho chúng tôi nếu có bất kỳ thay đổi nào.
</p>

<p>
    Chúng tôi sẽ sớm liên hệ với quý khách để xác nhận đơn hàng và thông báo lịch giao hàng chi tiết.
</p>

<p>
    Trân trọng,
</p>

<p>
    TORANO
</p>

</body>
</html>
