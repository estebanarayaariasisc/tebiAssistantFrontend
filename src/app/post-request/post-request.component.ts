import { Component } from '@angular/core';
import { PostService } from '../post.service';
import { ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-post-request',
  templateUrl: './post-request.component.html',
  styleUrls: ['./post-request.component.css']
})
export class PostRequestComponent {

  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  userMessage: string = '';
  messages: { content: string, sender: 'user' | 'server' }[] = [];

  constructor(private postService: PostService) { }

  // Función que envia el mensaje al server y muestra la respuesta
  sendPostRequest() {
    const userMessage = this.userMessage.trim();
    if (userMessage) {
      this.messages.push({ content: userMessage, sender: 'user' });
      this.userMessage = ''; 
      // Enviar mensaje al servidor
      this.postService.sendPostRequest(userMessage)
        .subscribe(
          response => {
            const serverResponse = response.response;
            this.messages.push({ content: serverResponse, sender: 'server' });
            this.chatContainer.nativeElement.scrollTop = (this.chatContainer.nativeElement.scrollHeight + 1000);
          },
          error => {
            console.error('Error en la solicitud:', error);
          }
        );  
    }
  }

}
